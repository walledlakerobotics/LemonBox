
import java.io.IOException;
import java.time.Year;
import java.util.Set;
import java.util.stream.Collectors;

import org.opencv.core.Core;

import com.fasterxml.jackson.databind.JsonNode;

import edu.wpi.first.cscore.CameraServerJNI;
import edu.wpi.first.cscore.OpenCvLoader;
import edu.wpi.first.math.jni.EigenJNI;
import edu.wpi.first.networktables.MultiSubscriber;
import edu.wpi.first.networktables.NetworkTableInstance;
import edu.wpi.first.networktables.NetworkTablesJNI;
import edu.wpi.first.networktables.PubSubOption;
import edu.wpi.first.util.CombinedRuntimeLoader;
import edu.wpi.first.util.WPIUtilJNI;
import io.javalin.Javalin;

public class Main {

    public static void main(String[] args) throws IOException, InterruptedException {

        NetworkTablesJNI.Helper.setExtractOnStaticLoad(false);
        WPIUtilJNI.Helper.setExtractOnStaticLoad(false);
        EigenJNI.Helper.setExtractOnStaticLoad(false);
        CameraServerJNI.Helper.setExtractOnStaticLoad(false);
        OpenCvLoader.Helper.setExtractOnStaticLoad(false);

        CombinedRuntimeLoader.loadLibraries(Main.class, "wpiutiljni", "wpimathjni", "ntcorejni",
                Core.NATIVE_LIBRARY_NAME, "cscorejni");

        // inits network table :3
        NetworkTableInstance inst = NetworkTableInstance.getDefault();
        inst.setServer("roboRIO-308-FRC");

        inst.startClient4("LemonClient");
        inst.startServer();

        while (!inst.isConnected()) {
            System.out.println("pending connection");

            Thread.sleep(1000);
        }

        MultiSubscriber subscriber = new MultiSubscriber(inst, new String[] { "/LemonBox" },
                PubSubOption.topicsOnly(true));

        // configures local host routes
        Javalin app = Javalin.create(config -> {
            config.staticFiles.enableWebjars();
            config.staticFiles.add("/dist");

            config.routes.get("/", ctx -> ctx.redirect("index.html"));

            // returns all motors that are connected to the networktables.
            config.routes.get("/api/motors", ctx -> {
                Set<Motor> motors = Motor.getMotors(subscriber);
                ctx.json(motors.stream().collect(Collectors.toMap(Motor::getId, Motor::getProperties)));
            });

            config.routes.get("/api/motors/{id}", ctx -> {
                String id = ctx.pathParam("id");
                try (Motor motor = Motor.getMotor(id, subscriber).get()) {
                    ctx.json(motor.getProperties());
                } catch (Exception e) {
                    System.out.println("get not working");
                }
            });

            config.routes.post("/api/motors/{id}", ctx -> {
                JsonNode json = ctx.bodyAsClass(JsonNode.class);
                String id = ctx.pathParam("id");

                try (Motor motor = Motor.getMotor(id, subscriber).get()) {
                    if (json.has("speed")) {
                        double speed = json.get("speed").asDouble();
                        motor.setSpeed(speed);
                    }

                    if (json.has("brushless")) {
                        boolean brushless = json.get("brushless").asBoolean();
                        motor.setBrushless(brushless);
                    }
                } catch (Exception e) {
                    System.out.println("post not working");
                }
            });
        });

        app.start(7070);
    }

}

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

import org.opencv.core.Core;

import com.boomaa.opends.display.DisplayEndpoint;
import com.fasterxml.jackson.databind.JsonNode;

import edu.wpi.first.cscore.CameraServerJNI;
import edu.wpi.first.cscore.OpenCvLoader;
import edu.wpi.first.math.jni.EigenJNI;
import edu.wpi.first.networktables.MultiSubscriber;
import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableInstance;
import edu.wpi.first.networktables.NetworkTablesJNI;
import edu.wpi.first.networktables.PubSubOption;
import edu.wpi.first.util.CombinedRuntimeLoader;
import edu.wpi.first.util.WPIUtilJNI;
import io.javalin.Javalin;

public class Main {

    // TODO: opends isn't finding the robot.

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

        NetworkTable lemonTable = inst.getTable("LemonBox");
        try (MotorManager manager = new MotorManager(lemonTable)) {

            DisplayEndpoint.main(args);
            DisplayEndpoint.TEAM_NUMBER.setText("roboRIO-308-FRC");
            DisplayEndpoint.IS_ENABLED.setEnabled(true);

            try (MultiSubscriber subscriber = new MultiSubscriber(inst, new String[] { "/LemonBox/" },
                    PubSubOption.topicsOnly(true))) {
                // configures local host routes

                Javalin app = Javalin.create(config -> {
                    config.staticFiles.enableWebjars();
                    config.staticFiles.add("/dist");

                    config.routes.get("/", ctx -> ctx.redirect("index.html"));

                    config.routes.get("/api/connected", ctx -> {
                        ctx.json(inst.isConnected());
                    });

                    // returns all motors that are connected to the networktables.
                    config.routes.get("/api/motors", ctx -> {
                        Set<Motor> motors = manager.getMotors();

                        ctx.json(motors.stream()
                                .collect(Collectors.toMap(Motor::getId, Motor::getProperties)));

                        manager.refresh();
                    });

                    config.routes.get("/api/motors/{id}", ctx -> {
                        String id = ctx.pathParam("id");
                        Motor motor = manager.getMotor(id).get();

                        ctx.json(motor.getProperties());

                        manager.refresh();
                    });

                    config.routes.post("/api/motors/{id}", ctx -> {
                        JsonNode json = ctx.bodyAsClass(JsonNode.class);
                        String id = ctx.pathParam("id");

                        Motor motor = manager.getMotor(id).get();

                        if (json.has("speed")) {
                            double speed = json.get("speed").asDouble();
                            motor.setSpeed(speed);
                        }

                        if (json.has("brushless")) {
                            boolean brushless = json.get("brushless").asBoolean();
                            motor.setBrushless(brushless);
                        }

                        manager.refresh();
                    });
                });

                app.start(7070);
            }
        } catch (IOException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
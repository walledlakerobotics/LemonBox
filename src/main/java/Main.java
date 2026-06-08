
import java.io.IOException;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import org.opencv.core.Core;

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

    public static void main(String[] args) throws IOException, InterruptedException {

        // initializing WPIlib
        NetworkTablesJNI.Helper.setExtractOnStaticLoad(false);
        WPIUtilJNI.Helper.setExtractOnStaticLoad(false);
        EigenJNI.Helper.setExtractOnStaticLoad(false);
        CameraServerJNI.Helper.setExtractOnStaticLoad(false);
        OpenCvLoader.Helper.setExtractOnStaticLoad(false);

        CombinedRuntimeLoader.loadLibraries(
                Main.class,
                "wpiutiljni",
                "wpimathjni",
                "ntcorejni",
                Core.NATIVE_LIBRARY_NAME,
                "cscorejni");

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

            config.routes.post("/api/motors/{id}", ctx -> {

                Set<Motor> motors = Motor.getMotors(subscriber);
                String id = ctx.pathParam("id"); // gets the id being passed

                double speed = (double) ctx.req().getAttribute("speed");
                Boolean burshless = (boolean) ctx.req().getAttribute("brushless");

                // gets the motor with the corresponding id.
                Optional<Motor> motor = motors.stream()
                        .filter(m -> m.getId().equals(id))
                        .findFirst();

                try {
                    motor.get().setSpeed(speed);
                    motor.get().setBrushless(burshless);
                } catch (Exception e) {
                    System.err.println("couldn't post motor data.");
                }
            });

        });

        app.start(7070);
    }

}

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;

import com.fasterxml.jackson.databind.JsonNode;

import edu.wpi.first.networktables.MultiSubscriber;
import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableInstance;
import edu.wpi.first.networktables.NetworkTablesJNI;
import edu.wpi.first.networktables.PubSubOption;
import edu.wpi.first.util.CombinedRuntimeLoader;
import edu.wpi.first.util.WPIUtilJNI;
import io.javalin.Javalin;

public class Main {

    static {
        NetworkTablesJNI.Helper.setExtractOnStaticLoad(false);
        WPIUtilJNI.Helper.setExtractOnStaticLoad(false);

        try {
            CombinedRuntimeLoader.loadLibraries(
                    Main.class,
                    "wpiutiljni",
                    "ntcorejni",
                    "wpimath");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws IOException, InterruptedException, URISyntaxException {

        // inits network table :3
        final NetworkTableInstance inst = NetworkTableInstance.getDefault();
        final NetworkTable lemonTable = inst.getTable("LemonBox");
        final OpendsManager opendsManager = new OpendsManager();

        // makes sure that it pends for input.
        final Thread opendsThread = new Thread(() -> {
            opendsManager.setTeam("308");
            opendsManager.run();

        });

        try (final MotorManager manager = new MotorManager(lemonTable)) {
            try (final MultiSubscriber sub = new MultiSubscriber(inst, new String[] { "/LemonBox/" },
                    PubSubOption.topicsOnly(true))) {

                final Javalin app = Javalin.create(config -> {
                    config.staticFiles.enableWebjars();
                    config.staticFiles.add("/dist");

                    // this is directing the root to the html index file.
                    config.routes.get("/", ctx -> ctx.redirect("index.html"));

                    // returns all motors that are connected to the networktables.
                    config.routes.get("/api/motors", ctx -> {
                        manager.refresh();
                        ctx.json(manager.getMotors().stream().map(m -> m.getId()).toList());
                    });

                    config.routes.get("/api/motors/{id}", ctx -> {
                        String id = ctx.pathParam("id");

                        ctx.json(manager.getMotor(id).getProperties());
                    });

                    config.routes.post("/api/motors/{id}", ctx -> {
                        JsonNode json = ctx.bodyAsClass(JsonNode.class);
                        String id = ctx.pathParam("id");

                        Motor motor = manager.getMotor(id);

                        if (json.has("speed")) {

                            double speed = json.get("speed").asDouble();

                            motor.setSpeed(speed);
                        }

                        if (json.has("brushless"))
                            motor.setBrushless(json.get("brushless").asBoolean());

                        if (json.has("clearFaults"))
                            motor.setClearFaults(json.get("clearFaults").asBoolean());

                    });

                    config.routes.get("/api/", ctx -> {
                        HashMap<String, Object> json = new HashMap<>();

                        json.put("connected", inst.isConnected());
                        json.put("enabled", opendsManager.isEnabled());

                        ctx.json(json);

                    });

                    config.routes.post("/api/", ctx -> {
                        JsonNode json = ctx.bodyAsClass(JsonNode.class);

                        if (json.has("enabled"))
                            opendsManager.setEnable(json.get("enabled").asBoolean());

                        if (json.has("connected")) {
                            // put something here.
                        }
                    });

                    config.events.serverStopping(() -> {
                        opendsManager.setEnable(false);
                        opendsManager.quit();
                        opendsThread.join();

                        inst.stopClient();
                    });

                    config.events.serverStarting(() -> {
                        inst.setServer("roboRIO-308-FRC");
                        inst.startClient4("LemonClient");
                        opendsThread.start();

                    });
                });

                app.start(7070);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
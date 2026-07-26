import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.nio.charset.StandardCharsets;

import com.boomaa.opends.display.DisplayEndpoint;

public class OpendsManager implements Runnable {

    private PipedOutputStream outputStream;

    OpendsManager() {
        outputStream = new PipedOutputStream();

        try {
            System.setIn(new PipedInputStream(outputStream));
        } catch (IOException e) {
        }
    }

    synchronized void setTeam(String teamNumber) {
        String input = String.format("h\n%s\n", teamNumber);
        send(input);
    }

    synchronized void setEnable(boolean enabled) {
        DisplayEndpoint.IS_ENABLED.setSelected(enabled);
    }

    synchronized boolean isEnabled() {
        return DisplayEndpoint.IS_ENABLED.isSelected();
    }

    void estop() {
        send("e\n");
    }

    void restartRIO() {
        send("d\n");
    }

    void restartRobotCode() {
        send("c\n");
    }

    void quit() {
        send("q\n");
    }

    private synchronized void send(String cmd) {
        try {
            outputStream.write(cmd.getBytes(StandardCharsets.UTF_8));
            outputStream.flush();

            Thread.sleep(300);

        } catch (Exception e) {

        }
    }

    @Override
    public void run() {
        DisplayEndpoint.main(new String[] { "--headless" });
    }

}

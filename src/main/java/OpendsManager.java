import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.nio.charset.StandardCharsets;

import com.boomaa.opends.display.DisplayEndpoint;

public class OpendsManager implements Runnable {

    private PipedOutputStream outputStream;

    public OpendsManager() {
        outputStream = new PipedOutputStream();

        try {
            System.setIn(new PipedInputStream(outputStream));
        } catch (IOException e) {
        }
    }

    public void setTeam(String teamNumber) {
        String input = String.format("h\n%s\n", teamNumber);
        send(input);
    }

    public void togglEnable() {
        send("a\n");
    }

    public void refreshDisplay() {
        send("p\n");
    }

    public void estop() {
        send("e\n");
    }

    public void restartRIO() {
        send("d\n");
    }

    public void restartRobotCode() {
        send("c\n");
    }

    private synchronized void send(String cmd) {
        try {
            outputStream.write(cmd.getBytes(StandardCharsets.UTF_8));
            outputStream.flush();
        } catch (Exception e) {

        }
    }

    @Override
    public synchronized void run() {
        DisplayEndpoint.main(new String[] { "--headless" });
    }

}

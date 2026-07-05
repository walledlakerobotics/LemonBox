import java.io.IOException;
import java.io.PipedOutputStream;

import com.boomaa.opends.display.DisplayEndpoint;

public class OpendsManager implements Runnable {

    private PipedOutputStream outputStream;

    public OpendsManager() {
        outputStream = new PipedOutputStream();
    }

    public void setTeam(String teamNumber) {
        String input = String.format("h\n %s\n", teamNumber);
        try {
            outputStream.write(input.getBytes());
            outputStream.flush();
        } catch (IOException e) {

        }
    }

    public void togglEnable() {
        try {
            outputStream.write("a\n".getBytes());
            outputStream.flush();
        } catch (Exception e) {

        }
    }

    public void displayStats() {
        try {
            outputStream.write("a\n".getBytes());
            outputStream.flush();
        } catch (Exception e) {

        }
    }

    @Override
    public synchronized void run() {
        DisplayEndpoint.main(new String[] { "--headless" });
    }

}

import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import edu.wpi.first.networktables.NetworkTable;

public class MotorManager implements AutoCloseable {

    private NetworkTable table;
    private Set<Motor> currentMotors;

    /**
     * this stores a array of motors managing it.
     * 
     * @param table the network table where the motors are being posted
     */
    public MotorManager(NetworkTable table) {
        this.table = table;
        currentMotors = Motor.getMotors(table);
    }

    /**
     * Returns the current motors that was found in the table.
     * 
     * @return motors
     * @throws Exception
     */
    public Set<Motor> getMotors() throws Exception {

        refresh();

        return currentMotors;
    }

    /**
     * 
     * returns an optional Motor, corresponding to the id of the motor you want to
     * return.
     * also updating the currentMotors.
     * 
     * @param id the motors id
     * @return Motor
     * @throws Exception if It can't find the motor, or can't refresh.
     */
    public Optional<Motor> getMotor(String id) throws Exception {

        // refresh(); this causes issues

        return currentMotors.stream()
                .filter(m -> Objects.equals(m.getId(), id))
                .findFirst();
    }

    /**
     * Updates or Refreshes the current motors with the table, also closes the past
     * motor subscribers.
     * 
     * @throws Exception unable to close the subscribers.
     */
    public void refresh() throws Exception {
        close();
        currentMotors = Motor.getMotors(table);
    }

    @Override
    public void close() throws Exception {
        currentMotors.stream().forEach(m -> m.close());
    }
}

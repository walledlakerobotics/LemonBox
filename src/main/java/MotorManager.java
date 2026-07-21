import java.util.Collection;
import java.util.List;
import java.util.Objects;
import edu.wpi.first.networktables.NetworkTable;

public class MotorManager implements AutoCloseable {

    private final NetworkTable k_table;
    private Collection<Motor> m_currentMotors;

    /**
     * this stores a Collection of motors managing it.
     * 
     * @param table the network table where the motors are being posted
     * @throws Exception
     */
    public MotorManager(NetworkTable table) throws Exception {
        this.k_table = table;
        refresh();
    }

    /**
     * Gets the current motors that are cached.
     * 
     * @return cached Motors.
     * @throws Exception
     */
    public synchronized Collection<Motor> getMotors() throws Exception {
        this.refresh();
        return m_currentMotors;
    }

    /**
     * returns the motor on the network table corresponding to the CAN ID, that are
     * cached.
     * 
     * @param id the motor id
     * @return
     * @throws Exception
     */
    public synchronized Motor getMotor(String id) throws Exception {
        return m_currentMotors.stream()
                .filter(m -> Objects.equals(m.getId(), id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(String.format("Motor ID: %s, is Null!", id)));
    }

    public synchronized List<String> getMotorIDs() throws Exception {
        this.refresh();

        return Motor.getMotorIDs(k_table);
    }

    /**
     * updates the cached motor on the network table
     * 
     * @throws Exception
     */
    private synchronized void refresh() throws Exception {
        this.close();
        m_currentMotors = Motor.getMotors(k_table);
    }

    @Override
    public synchronized void close() throws Exception {
        if (m_currentMotors != null) {
            m_currentMotors.forEach(m -> m.close());
            m_currentMotors.clear();
        }
    }
}

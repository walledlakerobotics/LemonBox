import java.util.Collection;
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
    MotorManager(NetworkTable table) {
        this.k_table = table;
        refresh();
    }

    /**
     * Gets the current motors that are cached.
     * 
     * @return cached Motors.
     * @throws Exception
     */
    synchronized Collection<Motor> getMotors() {
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
    synchronized Motor getMotor(String id) {
        return m_currentMotors.stream()
                .filter(m -> Objects.equals(m.getId(), id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(String.format("Motor ID: %s, is Null!", id)));
    }

    /**
     * updates the cached motor on the network table
     * 
     * @throws Exception
     */
    synchronized void refresh() {
        this.close();

        m_currentMotors = Motor.getMotors(k_table);
    }

    @Override
    public synchronized void close() {
        if (m_currentMotors != null) {
            m_currentMotors.forEach(m -> m.close());
            m_currentMotors.clear();
        }
    }
}

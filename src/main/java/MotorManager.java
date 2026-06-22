import java.util.Collection;
import java.util.Optional;
import edu.wpi.first.networktables.NetworkTable;

public class MotorManager implements AutoCloseable {

    private final NetworkTable k_table;
    private Collection<Motor> m_currentMotors;

    /**
     * this stores a array of motors managing it.
     * 
     * @param table the network table where the motors are being posted
     * @throws Exception
     */
    public MotorManager(NetworkTable table) throws Exception {
        this.k_table = table;
        refresh();
    }

    public Collection<Motor> getMotors() throws Exception {
        return m_currentMotors;
    }

    public Motor getMotor(String id) {
        Optional<Motor> motor = m_currentMotors.stream().filter(m -> m.getId() == id).findFirst();
        return motor.orElseThrow(() -> new IllegalArgumentException(String.format("Motor {%s} Instance is Null!", id)));
    }

    public synchronized void refresh() throws Exception {
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

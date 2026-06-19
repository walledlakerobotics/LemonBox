import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import edu.wpi.first.networktables.NetworkTable;
// TODO: issue with mutiple instances of subscribers, which causes an overflow.

public class MotorManager implements AutoCloseable {
    
    private Set<Motor> currentMotors;

    public MotorManager(NetworkTable table) {
        currentMotors = Motor.getMotors(table);
    }

    public Set<Motor> getMotors() {
        return currentMotors;
    }

    public Optional<Motor> getMotor(String id) {
        return currentMotors.stream()
                .filter(m -> Objects.equals(m.getId(), id))
                .findFirst();
    }

    @Override
    public void close() throws Exception {
        currentMotors.stream().forEach(m -> m.close());
    }
}

import java.lang.foreign.Linker.Option;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import edu.wpi.first.networktables.NetworkTable;

public class MotorManager {
    private Set<Motor> currentMotors;

    public MotorManager(NetworkTable table) {
        currentMotors = Motor.getMotors(table);
    }

    public Set<Motor> getMotors(NetworkTable table) {
        currentMotors = Motor.getMotors(table);

        return currentMotors;
    }

    public Optional<Motor> getMotor(String id, NetworkTable table) {
        currentMotors = Motor.getMotors(table);

        return currentMotors.stream()
                .filter(m -> Objects.equals(m.getId(), id))
                .findFirst();
    }
}

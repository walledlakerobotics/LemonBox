
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import edu.wpi.first.networktables.BooleanEntry;
import edu.wpi.first.networktables.DoubleEntry;
import edu.wpi.first.networktables.MultiSubscriber;
import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.StringEntry;

public class Motor {

    private Integer m_id;
    private DoubleEntry m_speedEntry;
    private DoubleEntry m_ampsEntry;
    private DoubleEntry m_voltageEntry;
    private BooleanEntry m_brushlessEntry;
    private StringEntry m_typeEntry;
    private StringEntry m_faultsEntry;
    private StringEntry m_stickyFaults;

    /**
     * 
     * @param id       motor can id
     * @param subTable subtable of the motor
     */
    public Motor(String id, NetworkTable subTable) {
        this.m_id = Integer.parseInt(id);
        m_speedEntry = subTable.getDoubleTopic("speed").getEntry(0);
        m_ampsEntry = subTable.getDoubleTopic("amps").getEntry(0);
        m_voltageEntry = subTable.getDoubleTopic("voltage").getEntry(0);
        m_brushlessEntry = subTable.getBooleanTopic("brushless").getEntry(false);
        m_typeEntry = subTable.getStringTopic("type").getEntry("unknown");
        m_faultsEntry = subTable.getStringTopic("faults").getEntry("error getting informaton!");
        m_stickyFaults = subTable.getStringTopic("stickyFaults").getEntry("error getting informaton!");
    }

    public void setSpeed(double speed) {
        m_speedEntry.set(speed);
    }

    public void setBrushless(boolean brushless) {
        m_brushlessEntry.set(brushless);
    }

    public String getId() {
        return m_id.toString();
    }

    /**
     * gets the properties of the motor.
     * 
     * @return propertie map
     */
    public Map<String, Object> getProperties() {
        Map<String, Object> props = new HashMap<>();

        props.put("speed", m_speedEntry.get());
        props.put("amps", m_ampsEntry.get());
        props.put("voltage", m_voltageEntry.get());
        props.put("brushless", m_brushlessEntry.get());
        props.put("type", m_typeEntry.get());
        props.put("faults", m_faultsEntry.get());
        props.put("stickyFaults", m_stickyFaults.get());

        return props;
    }

    /**
     * getting motors
     * 
     * @param mainTable main table in the network
     * @return Motors that exist.
     */
    public static Set<Motor> getMotors(MultiSubscriber subscriber) {
        NetworkTable table = subscriber.getInstance().getTable("LemonBox");

        System.out.println(table.getSubTables());

        return table.getSubTables().stream().map(name -> new Motor(name, table.getSubTable(name)))
                .collect(Collectors.toSet());

    }

}


import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import edu.wpi.first.networktables.BooleanSubscriber;
import edu.wpi.first.networktables.DoubleSubscriber;
import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.StringSubscriber;

public class Motor implements AutoCloseable {

    private Integer m_id;
    private DoubleSubscriber m_speedSub;
    private DoubleSubscriber m_ampSub;
    private DoubleSubscriber m_voltageSub;
    private BooleanSubscriber m_brushlessSub;
    private StringSubscriber m_typeSub;
    private StringSubscriber m_faultsSub;
    private StringSubscriber m_stickySub;

    /**
     * 
     * @param id       motor can id
     * @param subTable subtable of the motor
     */
    public Motor(String id, NetworkTable subTable) {
        this.m_id = Integer.parseInt(id);
        m_speedSub = subTable.getDoubleTopic("speed").subscribe(0);
        m_ampSub = subTable.getDoubleTopic("amps").subscribe(0);
        m_voltageSub = subTable.getDoubleTopic("voltage").subscribe(0);
        m_brushlessSub = subTable.getBooleanTopic("brushless").subscribe(false);
        m_typeSub = subTable.getStringTopic("type").subscribe("unknown");
        m_faultsSub = subTable.getStringTopic("faults").subscribe("error getting faults!");
        m_stickySub = subTable.getStringTopic("stickyFaults").subscribe("error getting stickyFaults");

    }

    /**
     * sets the motor entry speed
     * @param speed
     */
    public void setSpeed(double speed) {
        m_speedSub.getTopic().getEntry(0).set(speed);
    }

    /**
     * sets the motor entry brushless
     * @param brushless
     */
    public void setBrushless(boolean brushless) {
        m_brushlessSub.getTopic().getEntry(false).set(brushless);
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

        props.put("speed", m_speedSub.get());
        props.put("amps", m_ampSub.get());
        props.put("voltage", m_voltageSub.get());
        props.put("brushless", m_brushlessSub.get());
        props.put("type", m_typeSub.get());
        props.put("faults", m_faultsSub.get());
        props.put("stickyFaults", m_stickySub.get());

        return props;
    }

    /**
     * getting motors
     * 
     * @param mainTable main table in the network
     * @return Motors that exist.
     */
    public static Set<Motor> getMotors(NetworkTable table) {
        return table.getSubTables().stream().map(name -> new Motor(name, table.getSubTable(name)))
                .collect(Collectors.toSet());

    }

    @Override
    public void close() {
        m_speedSub.close();
        m_ampSub.close();
        m_brushlessSub.close();
        m_voltageSub.close();
        m_typeSub.close();
        m_faultsSub.close();
        m_stickySub.close();
    }
}

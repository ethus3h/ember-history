package ember.Client.Session;

import ember.Client.CommandProcessor;
import ember.Client.Context;
import ember.Common.Exception.UnknownSessionTypeException;
import ember.Common.Process.ProcessManager;

/**
 * Created by elliot on 14.11.27.
 */
public class Session {
    public CommandProcessor commandProcessor;
    public boolean running = true;
    public Context context;
    public ProcessManager pm = new ProcessManager();

    public Session() {
        this.commandProcessor = new CommandProcessor(this);
    }
    public Session make(Context c) throws UnknownSessionTypeException {
        if(c.context == "terminal") {
            return new TerminalSession();
        }
        else if(c.context == "null") {
            return new NullSession();
        }
        throw new UnknownSessionTypeException();
    }

}

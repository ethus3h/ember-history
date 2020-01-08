package ember.Client.Session;

import ember.Client.Context;
import ember.Client.Session.Session;
import ember.Common.Exception.NoContextsFoundException;
import ember.Common.Exception.NullContextOnlyException;
import ember.Common.Exception.NullSessionArrayListException;
import ember.Common.Exception.UnknownSessionTypeException;
import ember.Common.Process.EmberProcess;

import java.util.ArrayList;

/**
 * Created by elliot on 14.11.27.
 */
public class SessionCreator implements EmberProcess {
    public ArrayList<Session> sessions = new ArrayList<Session>();
    public SessionCreator() throws NoContextsFoundException, NullSessionArrayListException, UnknownSessionTypeException {
        try {
            this.getContexts();
        } catch (NullContextOnlyException e) {
            System.out.println("It doesn't look like you're using Ember in a context in which you can give it commands. Presumably in a later version, a scriptable interface will be available.");
        }

    }

    public void getContexts() throws NoContextsFoundException, NullSessionArrayListException, NullContextOnlyException, UnknownSessionTypeException {
        if(System.console() != null) {
            this.sessions.add(new Session().make(new Context("terminal")));
        }
        if(System.console() == null) {
            this.sessions.add(new Session().make(new Context("null")));
        }
        if(this.sessions == null)
        {
            //System.out.println("Doom! Im here");
            throw new NullSessionArrayListException();
        }
        else {
            if(this.sessions.size() <= 1) {
                if(this.sessions.get(0).context.context == "null") {
                    //System.out.println("Doom! Im hereee");
                    throw new NullContextOnlyException();
                }
            }
        }
    }

    @Override
    public void processSignalHandler(Integer signal) {

    }

    @Override
    public void run() {

    }

    @Override
    public void start(String cmd, Session s, Object... args) throws NoContextsFoundException, UnknownSessionTypeException, NullSessionArrayListException {
        try {
            this.getContexts();
        } catch (NullContextOnlyException e) {
            System.out.println("It doesn't look like you're using Ember in a context in which you can give it commands. Presumably in a later version, a scriptable interface will be available.");
        }

    }

    @Override
    public void pause() {

    }

    @Override
    public void resume() {

    }

    @Override
    public void terminate() {

    }

    @Override
    public void kill() {

    }
}

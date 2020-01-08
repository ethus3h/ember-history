package ember;

import org.apache.commons.io.IOUtils;
import org.w3c.dom.Document;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Return a Document for working with in Java from an Ember language document
 */
public class Parser {
    /**
     * Given a path (stored as a string) to a file accessible to the Java VM, return a Document object representing that file's contents parsed as Ember language document
     * @param path a path (stored as a string) to a file accessible to the Java VM
     * @return a Document object representing the input file's contents parsed as Ember language document
     * @throws IOException
     */
    public Document parseFileFromStringPath(String path) throws IOException {
        return parseFile(Paths.get(path));
    }

    /**
     * Given a path (stored as a byte array) to a file accessible to the Java VM, return a Document object representing that file's contents parsed as Ember language document
     * @param path Path (stored as a byte array) to a file accessible to the Java VM
     * @return Document object representing the input file's contents parsed as Ember language document
     * @throws IOException
     */
    public Document parseFileFromBinaryPath(byte[] path) throws IOException {
        // TODO: Test this on a variety of filenames to make sure the Path object points to the right thing.
        /* https://stackoverflow.com/q/17574916 seems to say that UTF-8 isn't lossless for handling arbitrary
           binary data, and implies (though I'm not certain of my reading of it, or that they
           know what they're talking about) that ISO_8859_1 might be. In other words, the answer implies that
           interpreting as ISO_8859_1 will work with *all* filenames, whether UTF-8, ISO-8859-1, EBCDIC, or
           non-encoded binary garbage correctly.... with the big caveat that I'm reading it correctly.
           I don't know if this would work this way, but I don't know any other option to open a file
           given a pathname than to assume an encoding for it. I'm specifically interested in getting a
           java.nio.file.Path object (only takes a String as its constructor) to be able to open the file
           that I know the path to (as an array of bytes, but don't know the encoding). Another option to
           deal with this would be to make a hexdump/base64 of the byte array, pass that to a shell script,
           and have the shell script return the file contents, but that's really ugly.
         */
        return parseBytes(Files.readAllBytes(Paths.get(new String(path, StandardCharsets.ISO_8859_1))));
    }

    /**
     * Given a path (java.nio.file.Path) to a file accessible to the Java VM, return a Document object representing that file's contents parsed as Ember language document
     * @param path a path (java.nio.file.Path) to a file accessible to the Java VM
     * @return a Document object representing the input file's contents parsed as Ember language document
     * @throws IOException
     */
    public Document parseFile(Path path) throws IOException {
        return parseBytes(Files.readAllBytes(path));
    }

    /**
     * Given a string stored by Java (Java strings are UTF-16), return a Document object representing that string parsed as Ember language document
     * @param input a string stored by Java (Java strings are UTF-16)
     * @return a Document object representing the input string parsed as Ember language document
     * @throws IOException
     */
    public Document parseString(String input) throws IOException {
        return parseBytes(input.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Given a byte array of UTF-8 text, return a Document object representing that string parsed as Ember language document
     * @param input is a byte array of UTF-8 text
     * @return a Document object representing the input string parsed as Ember language document
     * @throws IOException
     */
    public Document parseBytes(byte[] input) throws IOException {
        byte[] treeDiagram = getTreeDiagram(input);

        return null;
    }

    byte[] getTreeDiagram(byte[] input) throws IOException {
        // We use the external Perl 6 grammar to handle the heavy lifting of parsing the file
        Runtime rt = Runtime.getRuntime();

        String[] commands = {"../p6/parseDocument"};
        Process process = rt.exec(commands);

        // Send the input data to the external process
        process.getOutputStream().write(input);

        // Return stdout of command. This isn't a Document yet, but a Perl 6 specific tree diagram of the document, which will need to be converted
        return IOUtils.toByteArray(process.getInputStream());
    }
}

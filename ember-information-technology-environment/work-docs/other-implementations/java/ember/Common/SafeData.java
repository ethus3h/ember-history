package ember.Common;


import ember.Common.DataProcessor.HashGenerator;
import ember.Common.Exception.CorruptedSafeDataException;

import java.security.NoSuchAlgorithmException;

/**
 * Created by PermissionGiver on 8/16/14.
 */
public class SafeData {

    public int length;
    public String md5;
    public String sha;
    public String s29;
    public String crc;
    public byte[] data;

    public SafeData(byte[] s) throws NoSuchAlgorithmException {
        data = s;
        length = data.length;
        HashGenerator h = new HashGenerator();
        md5 = h.md5(data);
        sha = h.sha(data);
        s29 = h.s29(data);
        crc = h.crc(data);

    }

    public void clearMd5() {
        md5 = "";
    }

    public void clearSha() {
        sha = "";
    }

    public void clearS29() {
        s29 = "";
    }

    public void clearCrc() {
        crc = "";
    }

    public void check() throws NoSuchAlgorithmException, CorruptedSafeDataException {
        checkMd5();
        checkSha();
        checkS29();
        checkCrc();
    }

    public void checkMd5() throws NoSuchAlgorithmException, CorruptedSafeDataException {
        HashGenerator h = new HashGenerator();
        if(! this.md5.equals(h.md5(data))){
            throw new CorruptedSafeDataException();
        }
    }

    public void checkSha() throws NoSuchAlgorithmException, CorruptedSafeDataException {
        HashGenerator h = new HashGenerator();
        if(! this.sha.equals(h.sha(data))){
            throw new CorruptedSafeDataException();
        }
    }

    public void checkS29() throws NoSuchAlgorithmException, CorruptedSafeDataException {
        HashGenerator h = new HashGenerator();
        if(! this.s29.equals(h.s29(data))){
            throw new CorruptedSafeDataException();
        }
    }

    public void checkCrc() throws NoSuchAlgorithmException, CorruptedSafeDataException {
        HashGenerator h = new HashGenerator();
        if(! this.crc.equals(h.crc(data))){
            throw new CorruptedSafeDataException();
        }
    }
}

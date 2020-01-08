// This file contains the public interface for EITE NDW.
async function runTests() {
    let boolReturn;

    /* Returns true if all tests pass; false otherwise. Displays a report of the tests. */
    await setupIfNeeded();
    await clearTestStats();
    await runTestsOnly(true);
    await reportTests();
    if (await implEq(intFailedTests, 0)) {

        boolReturn = true;  return boolReturn;
    }

    boolReturn = false;  return boolReturn;
}

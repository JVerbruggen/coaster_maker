function assert(condition, message = "Assertion failed") {
    if (!condition) {
        throw message;
    }
}
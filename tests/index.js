/**
 * The following is a before hook for all the defined test cases
 * defined after this. This is attaching a before hook to the root
 * level of mocha. For more information on root level hooks,
 * check out: https://mochajs.org/#root-level-hooks
 *
 * The following hook connects with the mongoDB based on the environment variable passed.
 * In general scenario if nothing is passed then it is supposed to connect with the
 * local DB.
 *
 * All files that are included here is going to run synchronously, thus there needs to
 * be no worry about the concurrency of these tests.
 */

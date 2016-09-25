/** log system
   TODO Avoid log when we are in productions

 */
const log = (type) => console.log.bind(console, type);

export default {log};

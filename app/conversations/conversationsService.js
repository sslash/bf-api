var conversationsDAO = require('./conversationsDAO');
function getAll () {
    return conversationsDAO.getAll();
}

module.exports = {
    getAll: getAll
};

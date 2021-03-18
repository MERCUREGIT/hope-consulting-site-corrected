module.exports = function paginator(newPage = 1, list = [], limit = 2) {
    const page = parseInt(newPage);
    const count = Math.floor(list.length / limit);
    const oddEndElementsPosition = (list.length - count)* limit;

    const initialtPosition = (page - 1) <= 0 ? 0 : (page - 1) * limit;
    const currentPosition =  page * limit;
    return list.slice(initialtPosition,currentPosition );
}
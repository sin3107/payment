export default function buildCounter() {
    return ({
        id,
        seq
    }) => {
        return Object.freeze({
            _id: String(id),
            seq: Number(seq)
        })   
    }
}
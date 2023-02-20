export default function buildMember() {
    return ({
        memberName,
        memberBankName,
        memberAccountNumber,
        memberAccountName
    }) => {
        return Object.freeze({
            member_name: String(memberName),
            member_bank_name: String(memberBankName),
            member_account_number: Number(memberAccountNumber),
            member_account_name: String(memberAccountName)
        })
    } 
}
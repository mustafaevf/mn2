function formatMoney(amount, decimals = 2) {
    const roundedAmount = amount.toFixed(decimals);

    const [integer, decimal] = roundedAmount.split('.');
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
}

module.exports = { formatMoney };

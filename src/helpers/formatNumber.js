const formatNumber = (number) => {
  const formatedNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);

  return formatedNumber;
};

export default formatNumber;

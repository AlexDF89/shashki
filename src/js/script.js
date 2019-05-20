window.onload = function () {

  const btnCopy = document.getElementById('btn-copy');
  const connectingLink = document.getElementById('connectingLink');

  function copyLink() {

    const range = document.createRange();  

    range.selectNode(connectingLink);  
    window.getSelection().addRange(range);  

    document.execCommand("copy");

    window.getSelection().removeAllRanges();

    const connectingLinkMessage = document.getElementById('connectingLink-message');

    connectingLinkMessage.style.marginTop = '0';


    const timeout = setTimeout(() => {
      connectingLinkMessage.style.marginTop = '-40px';
      clearTimeout(timeout);
    }, 3000);

  }

  btnCopy.addEventListener('click', e => {
    e.preventDefault();
    copyLink();
  });

  connectingLink.addEventListener('click', () => {
    copyLink();
  });

}
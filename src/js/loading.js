document.onreadystatechange = function () {
   if (document.readyState !== "complete") {      
      document.getElementById('loading-container').style.display = "block";
   } else {
      document.getElementById('loading-container').style.display = "none";
   }
};
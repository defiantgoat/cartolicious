const colorTileWorker = () => {

  self.addEventListener("message", function(e) {
    console.log(data);

    self.postMessage("catburger");
    self.close(); 

  }, false);
};

export default colorTileWorker;

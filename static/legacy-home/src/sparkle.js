$(document).ready(function() {
  $(".star-background")
    .sparkle({
      // accepts a HEX string, or "rainbow" or an array of HEX strings:
      color: [
        "#ffffff",
        "#fec9f8",
        "#fef6a6",
        "#b1eff4",
        "#fbaeb8",
        "#fed687",
        "#fb8b99"
      ],
      // determine how many sparkles will be on the element at a time
      count: 10,
      // tell the canvas how far over the edge of it's container it should overlap in pixels.
      overlap: 0,
      // set the speed multiplier
      speed: 0.4,
      // min size
      minSize: 15,
      // max size
      maxSize: 20,
      // "up", "down" or "both" to set which direction the sparkles will travel in.
      direction: "up"
    })
    .trigger("mouseover.sparkle")
    .off("mouseout.sparkle");
});

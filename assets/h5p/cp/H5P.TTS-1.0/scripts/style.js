  export const styleListeningButtonWrapper = ($wrapper) => {
    $wrapper.css({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: "#e6f0ff",
      border: "1px solid #bcd4ff",
      cursor: "pointer",
      fontSize: "16px",
      lineHeight: "1",
      userSelect: "none",
      marginLeft: "6px",
      transition: "background 0.2s, transform 0.1s"
    });

    // Hover state
    $wrapper.on("mouseenter", () => {
      $wrapper.css("background", "#d8e8ff");
    });

    // Reset on leave
    $wrapper.on("mouseleave", () => {
      $wrapper.css("background", "#e6f0ff");
      $wrapper.css("transform", "scale(1)");
    });

    // Press animation
    $wrapper.on("mousedown", () => {
      $wrapper.css("transform", "scale(0.92)");
    });
    $wrapper.on("mouseup", () => {
      $wrapper.css("transform", "scale(1)");
    });

  }
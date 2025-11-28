(function () {
  function initSaleCountdown(root) {
    const countdownElement = root.querySelector(".countdown");
    if (!countdownElement) return;

    const daysElement = countdownElement.querySelector(
      '[data-countdown-unit="days"]'
    );
    const hoursElement = countdownElement.querySelector(
      '[data-countdown-unit="hours"]'
    );
    const minutesElement = countdownElement.querySelector(
      '[data-countdown-unit="minutes"]'
    );
    const secondsElement = countdownElement.querySelector(
      '[data-countdown-unit="seconds"]'
    );

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
      return;
    }

    const prevId = countdownElement.dataset.countdownIntervalId;
    if (prevId) {
      clearInterval(Number(prevId));
    }

    let days = Number.parseInt(daysElement.textContent.trim(), 10) || 0;
    let hours = Number.parseInt(hoursElement.textContent.trim(), 10) || 0;
    let minutes = Number.parseInt(minutesElement.textContent.trim(), 10) || 0;
    let seconds = Number.parseInt(secondsElement.textContent.trim(), 10) || 0;

    let remainingSeconds =
      days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;

    function renderFromTotalSeconds(total) {
      const d = Math.floor(total / (24 * 60 * 60));
      const h = Math.floor((total / (60 * 60)) % 24);
      const m = Math.floor((total / 60) % 60);
      const s = total % 60;

      daysElement.textContent = String(d);
      hoursElement.textContent = String(h);
      minutesElement.textContent = String(m);
      secondsElement.textContent = String(s).padStart(2, "0");
    }

    function tick() {
      if (remainingSeconds <= 0) {
        remainingSeconds = 0;
        renderFromTotalSeconds(remainingSeconds);
        const id = countdownElement.dataset.countdownIntervalId;
        if (id) {
          clearInterval(Number(id));
        }
        return;
      }

      remainingSeconds -= 1;
      renderFromTotalSeconds(remainingSeconds);
    }

    renderFromTotalSeconds(remainingSeconds);

    const intervalId = setInterval(tick, 1000);
    countdownElement.dataset.countdownIntervalId = String(intervalId);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initSaleCountdown(document);
    });
  } else {
    initSaleCountdown(document);
  }

  if (window.htmx) {
    document.body.addEventListener("htmx:afterSwap", (event) => {
      initSaleCountdown(event.target);
    });
    document.body.addEventListener("htmx:afterOnLoad", (event) => {
      initSaleCountdown(event.target);
    });
  }
})();

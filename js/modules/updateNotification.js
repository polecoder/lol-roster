/**
 * Creates a notification with toastify for the update of the favourite champion
 *
 * @param {Object} champion A champion object exactly the same as when returned from the Data Dragon API
 * @returns {void}
 */
export function updateNotification(champion) {
  Toastify({
    text: `Your favourite champion is now ${champion.name}`,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    style: { background: "#061C25" },
    className: "info",
  }).showToast();
}

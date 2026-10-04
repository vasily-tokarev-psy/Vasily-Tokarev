/* ============================================================
   Портфолио — Василий Токарев
   Скрипты: меню, появление при скролле, форма, год в подвале
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Мобильное меню ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  var overlay = document.getElementById("overlay");

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("open");
    if (burger) {
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Открыть меню");
    }
    if (overlay) overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openMenu() {
    nav.classList.add("open");
    if (burger) {
      burger.classList.add("open");
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Закрыть меню");
    }
    if (overlay) overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function toggleMenu() {
    if (!nav) return;
    nav.classList.contains("open") ? closeMenu() : openMenu();
  }

  if (burger && nav) {
    burger.addEventListener("click", toggleMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);
  }

  /* Закрываем меню при переходе по якорям */
  document.querySelectorAll(".nav a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* Закрытие по Escape */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Шапка: тень при скролле ---------- */
  var header = document.getElementById("site-header");
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Появление блоков при скролле ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Форма контактов ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("input[name='name']");
      var contact = form.querySelector("input[name='contact']");
      var message = form.querySelector("textarea[name='message']");

      if (!name.value.trim() || !contact.value.trim() || !message.value.trim()) {
        alert("Пожалуйста, заполните все поля формы.");
        return;
      }

      var btn = form.querySelector("button[type='submit']");
      var originalText = btn.textContent;
      btn.textContent = "Спасибо! Сообщение отправлено";
      btn.disabled = true;
      btn.style.background = "var(--green)";

      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = "";
        form.reset();
      }, 3500);
    });
  }

  /* ---------- Текущий год в подвале ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
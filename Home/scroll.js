window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        // Adiciona classe sólida quando o scroll é maior que 50px
        navbar.classList.add('solid-navbar');
        navbar.classList.remove('bg-cor');
    } else {
        // Volta para transparente se o scroll for menor que 50px
        navbar.classList.remove('solid-navbar');
        navbar.classList.add('bg-cor');
    }
});

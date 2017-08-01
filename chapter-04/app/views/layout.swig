<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- 브라우저에게 웹사이트가 모바일에 최적화되었음을 알림 -->
    <meta name="viewport" content="" width="device-width, initial-scale=1.0"/>

    <title>{{ title }}</title>

    <!-- 구글 머터리얼 폰트와 아이콘 불러오기 -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <!-- 컴파일되고 압축된 CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <nav class="orange darken-4" role="navigation">
        <div class="nav-wrapper container">
            <a id="logo-container" href="/" class="brand-logo">Logo</a>
            <ul class="right hide-on-med-and-down">
                <li><a href="/books">Books</a></li>
                <li><a href="/books/add">Add Picture</a></li>
            </ul>
            <ul id="nav-mobile" class="side-nav" style="transform: translateX(-100%);">
                <li><a href="/books">Books</a></li>
                <li><a href="/books/add">Add Picture</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" class="button-collapse">
                <i class="material-icons">menu</i>
            </a>
        </div>
    </nav>
    {% block content %}{% endblock %}
    <!-- 푸터 -->
    <footer class="page-footer orange darken-4">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text">Some Text Example</h5>
                    <p class="grey-text text-lighten-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
                <div class="col l3 s12">
                    <h5 class="white-text">Sample Links</h5>
                    <ul>
                        <li><a class="white-text" href="#!">Link 1</a></li>
                        <li><a class="white-text" href="#!">Link 2</a></li>
                        <li><a class="white-text" href="#!">Link 3</a></li>
                        <li><a class="white-text" href="#!">Link 4</a></li>
                    </ul>
                </div>
                <div class="col l3 s12">
                    <h5 class="white-text">Sample Links</h5>
                    <ul>
                        <li><a class="white-text" href="#!">Link 1</a></li>
                        <li><a class="white-text" href="#!">Link 2</a></li>
                        <li><a class="white-text" href="#!">Link 3</a></li>
                        <li><a class="white-text" href="#!">Link 4</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                MVC Express App for: <a class="white-text text-darken-2" href="#">Node.js 6 Blueprints Book</a>
            </div>
        </div>
    </footer>

    <!-- 스크립트는 페이지 하단에 배치 -->
    {% if ENV_DEVELOPMENT %}
    <script src="http://localhost:35729/livereload.js"></script>
    {% endif %}
    <!-- jQuery를 materialize.js보다 먼저 불러온다 -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <!-- 반응형 사이드 내비게이션 메뉴 초기화 -->
    <script>
        (function ($) {
            $('.button-collapse').sideNav();
            $('.materialboxed').materialbox();
        })(jQuery);
    </script>
</body>
</html>

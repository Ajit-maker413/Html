(function($) {
    $.fn.tabify = function(options) {
        const settings = $.extend({
            activeClass: 'active',
            animationSpeed: 300,
            defaultTab: 0
        }, options);

        return this.each(function() {
            const $wrapper = $(this);
            const $navLinks = $wrapper.find('.tab-list a');
            const $panels = $wrapper.find('.tab-panel');

            function switchTab(hash) {
                const $targetPanel = $(hash);
                if ($targetPanel.length) {
                    $navLinks.removeClass(settings.activeClass);
                    $wrapper.find(`a[href="${hash}"]`).addClass(settings.activeClass);
                    $panels.hide();
                    $targetPanel.fadeIn(settings.animationSpeed);
                    window.location.hash = hash;
                }
            }

            const initialHash = window.location.hash;
            if (initialHash && $wrapper.find(`a[href="${initialHash}"]`).length) {
                switchTab(initialHash);
            } else {
                const firstTab = $navLinks.eq(settings.defaultTab).attr('href');
                switchTab(firstTab);
            }

            $navLinks.on('click', function(e) {
                e.preventDefault();
                switchTab($(this).attr('href'));
            });

            $navLinks.on('keydown', function(e) {
                let currentIndex = $navLinks.index(this);
                if (e.which === 39) {
                    let next = (currentIndex + 1) % $navLinks.length;
                    $navLinks.eq(next).focus().click();
                } else if (e.which === 37) {
                    let prev = (currentIndex - 1 + $navLinks.length) % $navLinks.length;
                    $navLinks.eq(prev).focus().click();
                }
            });
        });
    };
}(jQuery));
'use strict';



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

customElements.define('compodoc-menu', function (_HTMLElement) {
    _inherits(_class, _HTMLElement);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.isNormalMode = _this.getAttribute('mode') === 'normal';
        return _this;
    }

    _createClass(_class, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.render(this.isNormalMode);
        }
    }, {
        key: 'render',
        value: function render(isNormalMode) {
            let tp = lithtml.html(
'<nav>\n    <ul class="list">\n        <li class="title">\n            \n                <a href="index.html" data-type="index-link">Angular Swiss Army Knife</a>\n            \n        </li>\n\n        <li class="divider"></li>\n        ' + (isNormalMode ? '<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>' : '') + '\n        <li class="chapter">\n            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>\n            <ul class="links">\n                \n                    <li class="link">\n                        <a href="overview.html" data-type="chapter-link">\n                            <span class="icon ion-ios-keypad"></span>Overview\n                        </a>\n                    </li>\n                    <li class="link">\n                        <a href="index.html" data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>README\n                        </a>\n                    </li>\n                \n                \n                \n                    <li class="link">\n                        <a href="dependencies.html"\n                            data-type="chapter-link">\n                            <span class="icon ion-ios-list"></span>Dependencies\n                        </a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n        <li class="chapter modules">\n            <a data-type="chapter-link" href="modules.html">\n                <div class="menu-toggler linked" data-toggle="collapse"\n                    ' + (isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"') + '>\n                    <span class="icon ion-ios-archive"></span>\n                    <span class="link-name">Modules</span>\n                    <span class="icon ion-ios-arrow-down"></span>\n                </div>\n            </a>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"') + '>\n                \n                    <li class="link">\n                        <a href="modules/SwissArmyKnifeModule.html" data-type="entity-link">SwissArmyKnifeModule</a>\n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#directives-links-module-SwissArmyKnifeModule-c1835330f41c723334602c66e8717d3b"' : 'data-target="#xs-directives-links-module-SwissArmyKnifeModule-c1835330f41c723334602c66e8717d3b"') + '>\n                                    <span class="icon ion-md-code-working"></span>\n                                    <span>Directives</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="directives-links-module-SwissArmyKnifeModule-c1835330f41c723334602c66e8717d3b"' : 'id="xs-directives-links-module-SwissArmyKnifeModule-c1835330f41c723334602c66e8717d3b"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="directives/NgIonicSyncFormcontrolClassesDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgIonicSyncFormcontrolClassesDirective</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#pipes-links-module-SwissArmyKnifeModule-c1835330f41c723334602c66e8717d3b"' : 'data-target="#xs-pipes-links-module-SwissArmyKnifeModule-c1835330f41c723334602c66e8717d3b"') + '>\n                                    <span class="icon ion-md-add"></span>\n                                    <span>Pipes</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="pipes-links-module-SwissArmyKnifeModule-c1835330f41c723334602c66e8717d3b"' : 'id="xs-pipes-links-module-SwissArmyKnifeModule-c1835330f41c723334602c66e8717d3b"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="pipes/RoundNumberPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RoundNumberPipe</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n        \n        \n            \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"') + '>\n                <span class="icon ion-ios-paper"></span>\n                <span>Classes</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"') + '>\n                \n                    <li class="link">\n                        <a href="classes/BaseComponent.html" data-type="entity-link">BaseComponent</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/CachedObservable.html" data-type="entity-link">CachedObservable</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/DateHelper.html" data-type="entity-link">DateHelper</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/FileHelper.html" data-type="entity-link">FileHelper</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/FormHelper.html" data-type="entity-link">FormHelper</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/Helper.html" data-type="entity-link">Helper</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/MiscHelper.html" data-type="entity-link">MiscHelper</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/ObjectHelper.html" data-type="entity-link">ObjectHelper</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/StatefulObject.html" data-type="entity-link">StatefulObject</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/StringHelper.html" data-type="entity-link">StringHelper</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/SwissArmyKnife.html" data-type="entity-link">SwissArmyKnife</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n                <li class="chapter">\n                    <div class="simple menu-toggler" data-toggle="collapse"\n                        ' + (isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"') + '>\n                        <span class="icon ion-md-arrow-round-down"></span>\n                        <span>Injectables</span>\n                        <span class="icon ion-ios-arrow-down"></span>\n                    </div>\n                    <ul class="links collapse"\n                    ' + (isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"') + '>\n                        \n                            <li class="link">\n                                <a href="injectables/CachedObservableService.html" data-type="entity-link">CachedObservableService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/KeyValueStoreService.html" data-type="entity-link">KeyValueStoreService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/PubSubService.html" data-type="entity-link">PubSubService</a>\n                            </li>\n                        \n                    </ul>\n                </li>\n            \n        \n        \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n                ' + (isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"') + '>\n                <span class="icon ion-md-information-circle-outline"></span>\n                <span>Interfaces</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"') + '>\n                \n                    <li class="link">\n                        <a href="interfaces/ControlWithName.html" data-type="entity-link">ControlWithName</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/PubSubData.html" data-type="entity-link">PubSubData</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/SimpleChangeWrapper.html" data-type="entity-link">SimpleChangeWrapper</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/ValueChange.html" data-type="entity-link">ValueChange</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"') + '>\n                <span class="icon ion-ios-cube"></span>\n                <span>Miscellaneous</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"') + '>\n                \n                    <li class="link">\n                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>\n                    </li>\n                \n                \n                    <li class="link">\n                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>\n                    </li>\n                \n                \n                \n                    <li class="link">\n                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        <li class="chapter">\n            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>\n        </li>\n        \n        \n        \n        <li class="divider"></li>\n        <li class="copyright">\n                Documentation generated using <a href="https://compodoc.app/" target="_blank">\n                    \n                        \n                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">\n                        \n                    \n                </a>\n        </li>\n        \n    </ul>\n</nav>'
);
        this.innerHTML = tp.strings;
        }
    }]);

    return _class;
}(HTMLElement));
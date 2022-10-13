const cypher = (function () {
    let cypher = {}

    const register = e => e === e.toUpperCase()

    cypher.language = {
        ru: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
        en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        symbols: "~!@#$%^&*()_+=-{};|\|/,.?><;:№ ".split(""),
        all: [],
        joinAll: function () {
            cypher.language.all = [];
            for (var i in this) {
                if (typeof this[i] !== "function" && i !== "all") {
                    cypher.language.all = cypher.language.all.concat(this[i]);
                }
            }
        }
    }

    cypher.vizhener = {
        square: [],
        genSqViz: function (lang) {
            var l = cypher.language[lang];
            for (var i = 0; i < l.length; i++) {
                this.square[i] = l.slice(i).concat(l.slice(0, i));
            }
        },
        encryption: function (lang, text, key) {
            if (lang === "all") cypher.language.joinAll();
            else if (!Array.isArray(cypher.language[lang])) return;
            this.genSqViz(lang);

            var sText = text;

            text = text.toUpperCase();
            key = key.toUpperCase();

            var s = "", l = cypher.language[lang];
            for (var i = 0; i < text.length; i++) {
                s += this.square[l.indexOf(text[i])][l.indexOf(key[i])];
            }

            return s.split("").map((e, i) => register(sText[i]) ? e : e.toLowerCase()).join("");
        },
        decryption: function (lang, key, cipher) {
            if (lang === "all") cypher.language.joinAll();
            else if (!Array.isArray(cypher.language[lang])) return;
            this.genSqViz(lang);

            var sCipher = cipher;

            cipher = cipher.toUpperCase();
            key = key.toUpperCase();
            var s = "", l = cypher.language[lang];
            for (var i = 0; i < cipher.length; i++) {
                var row = l.indexOf(key[i])
                coll = this.square[row].indexOf(cipher[i]);
                s += l[coll];
            }
            return s.split("").map(function (e, i, a) { return register(sCipher[i]) ? e : e.toLowerCase(); }).join("");
        },
        outS: function () {
            for (var i = 0; i < this.square.length; i++) {
                document.write(this.square[i].join("") + "<br>");
            }
        }
    };

    cypher.caesar = {
        encryption: function (lang, text, slip) {
            var l = cypher.language[lang], text = text.split(""), s = "";
            for (var i = 0; i < text.length; i++) {
                var index = l.indexOf(text[i]) + slip;
                if (index >= l.length) index -= l.length;
                s += l[index];
            }
            return s;
        },
        decryption: function (lang, cipher, slip) {
            var l = cypher.language[lang], cipher = cipher.split(""), s = "";
            for (var i = 0; i < cipher.length; i++) {
                var index = l.indexOf(cipher[i]) - slip;
                if (index < 0) index += l.length;
                s += l[index];
            }
            return s;
        }
    };
    return cypher;
}());

document.write(cypher.vizhener.encryption("en", "ATTACKATDAWN", "LEMONLEMONLE") + "<br>"); // шифруем
document.write(cypher.vizhener.decryption("en", "LEMONLEMONLE", "LXFOPVEFRNHR") + "<br>"); // расшифровываем

document.write(cypher.vizhener.encryption("ru", "водкаВнутриАСнаружиБутылка", "курицакурицакурицакурицакурица") + "<br>"); // шифруем
document.write(cypher.vizhener.decryption("ru", "курицакурицакурицакурицакурица", "мвфуцВшжгщяАЬбрщйжуФдыслху") + "<br>"); // расшифровываем
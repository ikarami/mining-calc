(function () {
    "use strict";
    var App = {
        initialize: function () {
            var self = this, domReadyHandler;
            console.log('App :: initialize');
            domReadyHandler = function () {
                self.bindEvents();
            };
            document.addEventListener('DOMContentLoaded', function () {
                domReadyHandler();
            }, false);
        },

        bindEvents: function () {
            var self = this;
            document.querySelector('#obliczAMax').addEventListener('touchstart', function () {
                self.amax();
            });
            document.querySelector('#obliczEnMax').addEventListener('touchstart', function () {
                self.enmax();
            });
            Array.prototype.slice.call(document.querySelectorAll('.button')).forEach(function (node) {
                node.addEventListener('click', function (event) {
                    if (event.target.className.indexOf('left') !== -1) {
                        document.querySelector('.enmax').style.display = 'block';
                        document.querySelector('.amax').style.display = 'none';
                    } else {
                        document.querySelector('.enmax').style.display = 'none';
                        document.querySelector('.amax').style.display = 'block';
                    }
                });
            });
        },

        enmax: function () {
            var grubosc, Rc, RcT, odleglosc, g, nd, a, mn, ne, hd, wysokosc, et, l ,odl=0.0;
            var blad1,blad2,blad3,blad4=false;
            var napis;

            grubosc = Number(document.getElementById('gruboscWarstwyPiaskowca').value);
            blad1=((grubosc<=0)||(grubosc>=120));
            Rc = Number(document.getElementById('wytrzymaloscWarstwy').value);
            blad2=((Rc<=0)||(Rc>=100));
            odleglosc = Number(document.getElementById('odlegloscSpagu').value);
            blad3=((odleglosc<=0)||(odleglosc>=100));
            wysokosc = Number(document.getElementById('wysokoscFurty').value);
            blad4=((wysokosc<=0)||(wysokosc>=5));
            napis="Zła wartość\n";
            if (blad1)
            {
                napis=napis+"\t w polu grubość warstwy,\n";
            };
            if (blad2)
            {
                napis=napis+"\t w polu wytrzymałość warstwy,\n";
            };
            if (blad3)
            {
                napis=napis+"\t w polu odległość warstwy od pokładu,\n";
            };
            if (blad4)
            {
                napis=napis+"\t w polu wysokość furty eksploatacyjnej.\n";
            };
            if (blad1||blad2||blad3||blad4)
            {
                alert(napis);
            };
            a = Number(document.getElementById('stopienUsztywnienia').value);
            mn = Number(document.getElementById('gorotwor').value);
            ne = Number(document.getElementById('kierowanieStropem').value);
            switch (a)
            {
            case 8:
                g=0.8;
                break;
            case 14:
                g=1.2;
                break;
            case 18:
                g=1.6;
                break;
            case 24:
                g=3.1;
                break;
            };
            RcT=mn*Rc;
            nd=RcT/(RcT+48);
            hd=nd*(a/8)*((odleglosc+0.5*grubosc)/(ne*wysokosc));
            if (hd>grubosc)
               {
                hd=grubosc;
               };
            l=g*Math.sqrt((a/6)*(RcT/40)*(hd/0.023));
            if (odleglosc<2*ne*wysokosc )
                {
                odl=2*ne*wysokosc;
                }
            else
                {
                odl=odleglosc;
                };
            et=0.0022*1000000*(hd*l/odl)*(hd*l/odl);
            document.getElementById('grub').value = hd.toFixed(0);
            document.getElementById('rozp').value = l.toFixed(0);
            document.getElementById('energ').value = et.toExponential(0);
        },

        amax: function () {
            'use strict';
            var odl, odlh, et, wspampl, amax, vmax, mnoznik, fmin, fmax=0.0;
            var blad1,blad2,blad3=false;
            var napis;

            et = Number(document.getElementById('energiaWstzasu').value);
            blad1=((et<=1e5)||(et>=1e9));
            odl = Number(document.getElementById('odlegloscEpicentralna').value);
            blad2=((odl<0)||(odl>=5000));
            wspampl = Number(document.getElementById('wspAmplifikacjiDrgan').value);
            blad3=((wspampl<=0)||(wspampl>=5));
            napis="Zła wartość\n";
            if (blad1)
            {
                napis=napis+"\t w polu energia wstrząsu,\n";
            };
            if (blad2)
            {
                napis=napis+"\t w polu odległość epicentralna,\n";
            };
            if (blad3)
            {
                napis=napis+"\t w polu współczynnik amplifikacji drgań,\n";
            };
            if (blad1||blad2||blad3)
            {
                alert(napis);
            };
            odlh=Math.sqrt(250000+odl*odl)/1000;
            mnoznik=1.55*Math.pow(odlh,0.135)*Math.exp(-0.77*odlh)+0.04;
            if (mnoznik>1)
            {
                mnoznik=1;
            };
            vmax=mnoznik*wspampl*(0.00148*(Math.pow((Math.log(et)/Math.LN10),1.23))-0.011);
            mnoznik=1.53*Math.pow(odlh,0.155)*Math.exp(-0.65*odlh)+0.014;
            if (mnoznik>1)
            {
                mnoznik=1;
            };
            amax=mnoznik*wspampl*(0.00133*(Math.pow((Math.log(et)/Math.LN10),2.66))-0.089);
            fmin=(91*Math.exp(-0.78*(Math.log(et)/Math.LN10)))+1.79;
            fmax=(99*Math.exp(-0.49*(Math.log(et)/Math.LN10)))+1.27;
            document.getElementById('Wvmax').value = vmax.toFixed(4);
            document.getElementById('Wamax').value = amax.toFixed(3);
            document.getElementById('Fmax').value = fmax.toFixed(0);
            document.getElementById('Fmin').value = fmin.toFixed(0);
        }
    };

    App.initialize();
})();
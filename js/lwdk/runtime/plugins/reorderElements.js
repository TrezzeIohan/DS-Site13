(function(factory) {
    factory.reorderElements = function reorderElements(parent, childNodes, attr) {
        // Seleciona as divs que queremos ordenar
        let divs = document.querySelectorAll(childNodes);

        // Converte a NodeList de divs para array
        // https://developer.mozilla.org/en/docs/Web/API/NodeList#How_can_I_convert_NodeList_to_Array.3F
        let ordem = [].map.call(divs, function (element) {
            return element;
        });

        // Ordena a array pelo atributo 'contagem'
        ordem.sort(function (a, b) {
            let ca = parseInt(a.getAttribute("data-" + attr));
            let cb = parseInt(b.getAttribute("data-" + attr));
            return ca - cb;
        });

        // Reinsere os filhos no pai, resultando na ordem desejada
        let container = document.querySelector(parent);
        for (let i = 0; i < ordem.length; i++) {
            container.appendChild(ordem[i]);
        }
    };
})(LWDK);

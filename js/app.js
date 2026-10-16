function comprar() {
    let tipo = document.getElementById('tipo-ingresso').value;
    let qtd = Number(document.getElementById('qtd').value);

    // Aceitar apenas quantidades inteiras positivas
    if (!Number.isSafeInteger(qtd) || qtd <= 0) {
        alert('Informe uma quantidade inteira maior que zero.');
        return;
    }

    if (tipo === 'pista') {
        comprarPista(qtd);
    } else if (tipo === 'superior') {
        comprarSuperior(qtd);
    } else if (tipo === 'inferior') {
        comprarInferior(qtd);
    } else {
        alert('Selecione um tipo de ingresso válido.');
    }
}

function comprarPista(qtd) {
    atualizarEstoque('qtd-pista', qtd, 'pista');
}

function comprarSuperior(qtd) {
    atualizarEstoque('qtd-superior', qtd, 'superior');
}

function comprarInferior(qtd) {
    atualizarEstoque('qtd-inferior', qtd, 'inferior');
}

function atualizarEstoque(idEstoque, qtd, tipo) {
    let campoEstoque = document.getElementById(idEstoque);

    if (!campoEstoque) {
        alert('Não foi possível localizar o estoque desse ingresso.');
        return;
    }

    let textoEstoque = campoEstoque.textContent.trim();
    let estoque = Number(textoEstoque);

    // Conferir se o estoque contém um número válido
    if (
        textoEstoque === '' ||
        !Number.isSafeInteger(estoque) ||
        estoque < 0
    ) {
        alert('O estoque desse ingresso está inválido.');
        return;
    }

    // Validar também para chamadas diretas das funções
    if (!Number.isSafeInteger(qtd) || qtd <= 0) {
        alert('Informe uma quantidade inteira maior que zero.');
        return;
    }

    if (qtd > estoque) {
        alert(`Quantidade indisponível para o tipo ${tipo}.`);
        return;
    }

    // Descontar os ingressos e limpar a quantidade
    campoEstoque.textContent = estoque - qtd;
    document.getElementById('qtd').value = '';

    alert('Compra realizada com sucesso!');
}
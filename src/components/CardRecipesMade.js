import React from 'react';

// card dinâmico das receitas feitas
function CardRecipesMade() {
  // pegar do contexto as feitas/finalizadas
  // para que só assim ser dinâmico
  // pode ser modificado

  return (
    <div>
      <img
        src="link-img"
        alt="colocar-alt-da-img"
        data-testid={ `${index}-horizontal-image` }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        Categoria
      </p>
      <h1
        data-testid={ `${index}-horizontal-name` }
      >
        Nome da receita
      </h1>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        Receita feita em: 10/02/2021
        {' '}
      </p>
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src="https://s3-alpha-sig.figma.com/img/6b3d/a66a/ed177e387fee2096454faf5245297b92?Expires=1639958400&Signature=WdaRSp5qGcVcc-BuUkl9wzevQ79mSCE-Xmca0Y4WS3MkFCaCoWJFJEGeLaMENvHr0j5H2S9A~varorKMuKqjjAPfzjcR-bskFfWKRUhQ7zeyvO9QpyD-EDRSnIl6ApPkfZh2vPn28dMw1t3oZcF0MbNIc28BqP5fr9Fkhgk4rjQAkyt4iFwDhy2eewX6dZScdpW1~XlNKMQy4NH3ElcYRt8lnYzH0q47bHJe9BDbnVQL8zX4zorHHkqLIzQKWhd5PDQmo8sYDHoKZrxKC6bwzI09jwsazoZlUCqWd~M-UmESVyq7K49z9LRqlYm7C4oATKS5JFgc1Aj33J9FQUsBNg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        alt="share-icon"
        width="20px"
      />
      <p data-testid={ `${index}-${tagName}-horizontal-tag` }>{tagName}</p>
    </div>
  );
}

export default CardRecipesMade;

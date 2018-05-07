	$.extend($.expr[":"], {
    "containsNC": function(elem, i, match, array) {
      return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });

  $(document).ready(function(){
    $('input[name=peso]').focus();

    function fluidos_diarios (peso) {
      if(peso < 10) Daily_Vol = 100 * peso;
      if((peso >= 10) && (peso < 20 )) Daily_Vol = 1000 + (50 * (peso - 10));
      if(peso >= 20) Daily_Vol = 1500 + (20 * (peso - 20));
      if (Daily_Vol > 2400) Daily_Vol = 2400;
      return Daily_Vol;
    }

    function calcular_doses () {
      $("b.dose").each(function( index ) {
        $( this ).hide().text(($(this).data("dose-por-toma")*$('input[name=peso]').val()).toFixed(2)).fadeIn(80);
      });
      $("b.fluidos_diarios_manutencao").hide().text(fluidos_diarios($('input[name=peso]').val()) ).fadeIn(80);
      $("b.fluidos_diarios_taxa").hide().text( (fluidos_diarios( $('input[name=peso]').val() )/24).toFixed(1) ).fadeIn(80);
      if ($('input[name=peso]').val() < 27) {
        $("b.penicilina").hide().text('600.000').fadeIn(80);
        $("span.formulacao.pesopenicilina").hide().text('< 27 kg').fadeIn(80);

      } else {
        $("b.penicilina").hide().text('1.200.000').fadeIn(80);
        $("span.formulacao.pesopenicilina").hide().text('≥ 27 kg').fadeIn(80);
      };
    };

    $('input[name=peso]').keyup( function() {
      calcular_doses(); 
    });

    $("div.titulo_farmaco").click( function() {
      $(this).parents().children("div.posologia_calculada").toggle();
      $(this).toggleClass('open_drug');
    });

    $("div.linha1 div.posologia_calculada ").hide();
    $("div.linha1 .farmaco:first-child .posologia_calculada").show();
    $("div.linha1 .farmaco:first-child .titulo_farmaco").toggleClass('open_drug');

    $("div.linha2 div.posologia_calculada ").hide();



    $('input[name=barra_pesquisa]').keyup( function() {

      var pesquisa_farmaco = $('input[name=barra_pesquisa]').val();

      $("div.patologia h2:not(:containsNC('" + pesquisa_farmaco + "'))").parent().parent().hide();
      $("div.patologia h2:containsNC('" + pesquisa_farmaco + "')").parent().parent().show();
    });
  });
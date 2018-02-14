<?php
$response = new stdClass;
$params = json_decode(file_get_contents('php://input'));

$municipio = $params->cidade;

  if( $municipio == '99' ){

    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">ACRELÂNDIA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </head>
  <tbody>
  <tr>
    <td>1</td>
    <td>PSB / PSL / PMDB / PRP</td>
    <td>28,80%</td>
    <td>2.107</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PP / PSD</td>
    <td>22,86%</td>
    <td>1.673</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSDC / PROS</td>
    <td>17,25%</td>
    <td>1.262</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PRB / PR / DEM</td>
    <td>9,77%</td>
    <td>715</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PDT / PTN / PC do B / PHS</td>
    <td>9,09%</td>
    <td>665</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">ASSIS BRASIL</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PDT / PMDB / PSDB / PSC / PPS / PSD / PEN / PR</td>
    <td>46,12%</td>
    <td>2.096</td>
  </tr>
  <tr>
    <td>2</td>
    <td>DEM / PP</td>
    <td>19,16%</td>
    <td>871</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PT / PSL / PHS / PSB / PV</td>
    <td>16,02%</td>
    <td>728</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">BRASILÉIA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PMDB / PSDB</td>
    <td>38,73%</td>
    <td>5.138</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PT / PC do B / PSDC</td>
    <td>23,98%</td>
    <td>3.182</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSB / PROS / PDT</td>
    <td>21,47%</td>
    <td>2.849</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PP / PR / PTC / PTB / PSC / DEM / PRB / REDE / SD / PSD / PEN / PRP</td>
    <td>15,81%</td>
    <td>2.098</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">BUJARI</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PDT / PRB / PRP / PSC / PMB / PSOL</td>
    <td>29,20%</td>
    <td>1.858</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PMDB / DEM</td>
    <td>23,70%</td>
    <td>1.508</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PC do B / PRB / PR / PHS / PEN / PTC / PSC</td>
    <td>23,51%</td>
    <td>1.496</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSD / PSDC / PSDB</td>
    <td>10,47%</td>
    <td>666</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PSB / PROS</td>
    <td>2,22%</td>
    <td>141</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">CAPIXABA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PHS / PR / PSDB / PSD / PRB</td>
    <td>26,20%</td>
    <td>1.643</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PMDB / PTB / PSDB / PP</td>
    <td>22,34%</td>
    <td>1.401</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PT / PC do B / PDT / PRP</td>
    <td>20,83%</td>
    <td>1.306</td>
  </tr>
  <tr>
    <td>4</td>
    <td>DEM / PSDC</td>
    <td>19,36%</td>
    <td>1.214</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PHS / PSB</td>
    <td>11,26%</td>
    <td>706</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">CRUZEIRO DO SUL</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PMDB / PPS / PTB</td>
    <td>28,40%</td>
    <td>11.311</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PDT / PRP / PMN</td>
    <td>21,49%</td>
    <td>8.559</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PP / PR / PSC / PEN / SD / PSD</td>
    <td>14,07%</td>
    <td>5.603</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PHS / PC do B / PROS / PTN / PSL</td>
    <td>13,91%</td>
    <td>5.542</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PSB / PT / PMB / PV</td>
    <td>9,65%</td>
    <td>3.843</td>
  </tr>
  <tr>
    <td>6</td>
    <td>PSDC / PRB / PTC / DEM</td>
    <td>7,11%</td>
    <td>2.832</td>
  </tr>
  <tr>
    <td>7</td>
    <td>PSDB / REDE</td>
    <td>5,38%</td>
    <td>2.144</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">EPITACIOLÂNDIA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PTN / PROS</td>
    <td>29,81%</td>
    <td>2.670</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PSB / PTC</td>
    <td>22,34%</td>
    <td>2.001</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PP / PT do B / PRP / PDT / PSDC / PPS</td>
    <td>20,81%</td>
    <td>1.864</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSC / PSDB / PSD</td>
    <td>15,90%</td>
    <td>1.424</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PC do B / PRB / PSL / PHS / PV</td>
    <td>10,19%</td>
    <td>913</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">FEIJÓ</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PP / PSDB</td>
    <td>33,12%</td>
    <td>4.700</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PT / PC do B / PSL</td>
    <td>32,65%</td>
    <td>4.634</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PR / PSD / PRP</td>
    <td>19,67%</td>
    <td>2.791</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSB / PSDC / PDT / DEM</td>
    <td>14,56%</td>
    <td>2.066</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">JORDÃO</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PC do B</td>
    <td>43,97%</td>
    <td>1.633</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PSDB / PP</td>
    <td>25,44%</td>
    <td>945</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PDT</td>
    <td>18,69%</td>
    <td>694</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PMDB / PR</td>
    <td>11,90%</td>
    <td>442</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">MÂNCIO LIMA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PRB / PT / PC do B</td>
    <td>30,49%</td>
    <td>2.948</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PDT / PROS / PSDC</td>
    <td>21,94%</td>
    <td>2.121</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PP / PSDB / PSD / PPS</td>
    <td>14,68%</td>
    <td>1.419</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PTN / PSB / PV</td>
    <td>14,54%</td>
    <td>1.406</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">MANOEL URBANO</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PRB / PT / PSB / PV</td>
    <td>39,06%</td>
    <td>1.968</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PMDB / PP / PSDB</td>
    <td>35,60%</td>
    <td>1.794</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSD / PC do B / PR / PSOL / PPS</td>
    <td>23,58%</td>
    <td>1.188</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">MARECHAL THAUMATURGO</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PDT / PSL / PSDC</td>
    <td>29,38%</td>
    <td>2.148</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PTN / PSB / PC do B</td>
    <td>23,89%</td>
    <td>1.747</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PV</td>
    <td>16,43%</td>
    <td>1.201</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PP / PPS / PSD</td>
    <td>16,14%</td>
    <td>1.180</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PSC / PR / PSDB</td>
    <td>14,17%</td>
    <td>1.036</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">PLÁCIDO DE CASTRO</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PC do B / PT / PSOL</td>
    <td>27,84%</td>
    <td>2.923</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PR / PSDC / PDT / PSC</td>
    <td>27,20%</td>
    <td>2.856</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PTN / PSDB / SD</td>
    <td>19,34%</td>
    <td>2.031</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSD / PPS / DEM / PSL</td>
    <td>15,07%</td>
    <td>1.582</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PP / PTC / PSD / PV</td>
    <td>10,03%</td>
    <td>1.053</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">PORTO ACRE</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PC do B / PT / PSOL</td>
    <td>27,84%</td>
    <td>2.923</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PR / PSDC / PDT / PSC</td>
    <td>27,20%</td>
    <td>2.856</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PTN / PSDB / SD</td>
    <td>19,34%</td>
    <td>2.031</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSD / PPS / DEM / PSL</td>
    <td>15,07%</td>
    <td>1.582</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PP / PTC / PSD / PV</td>
    <td>10,03%</td>
    <td>1.053</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">PORTO WALTER</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PMDB / PP / PDT</td>
    <td>45,92%</td>
    <td>2.168</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PSDB / PSD / PR / PSDC</td>
    <td>35,71%</td>
    <td>1.686</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PT / PSB / PC do B / PROS</td>
    <td>18,36%</td>
    <td>867</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">RIO BRANCO</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PSB</td>
    <td>21,92%</td>
    <td>41.961</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PMDB / DEM / PSD</td>
    <td>12,11%</td>
    <td>23.175</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PDT / PRB</td>
    <td>11,65%</td>
    <td>22.305</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PHS / PTN</td>
    <td>10,46%</td>
    <td>20.028</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PSL / PMB</td>
    <td>8,87%</td>
    <td>16.984</td>
  </tr>
  <tr>
    <td>6</td>
    <td>PR / PSC / SD / PTC / PEN / PSDB</td>
    <td>8,15%</td>
    <td>15.591</td>
  </tr>
  <tr>
    <td>7</td>
    <td>PC do B / PSOL / PV</td>
    <td>7,01%</td>
    <td>13.414</td>
  </tr>
  <tr>
    <td>8</td>
    <td>PP / PPS / PTB / PMN</td>
    <td>5,77%</td>
    <td>11.047</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">RODRIGUES ALVES</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PROS</td>
    <td>38,36%</td>
    <td>3.319</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PMDB / PSC</td>
    <td>26,56%</td>
    <td>2.298</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PDT / PSD / PRP / PP</td>
    <td>21,65%</td>
    <td>1.873</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PHS / PRB / PSB / PC do B</td>
    <td>10,77%</td>
    <td>932</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">SANTA ROSA DO PURUS</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PTN / PC do B / PPS / PRB / PRP</td>
    <td>31,79%</td>
    <td>781</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PT / PROS / PDT / PSB / PT do B</td>
    <td>18,19%</td>
    <td>447</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSD / PSDB</td>
    <td>14,04%</td>
    <td>345</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PV / PTC / PSC</td>
    <td>9,04%</td>
    <td>222</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PP / PMDB / DEM</td>
    <td>2,44%</td>
    <td>60</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">SENA MADUREIRA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PSDB / PV / PSD / PPS / PSC / PTC / PEN</td>
    <td>27,20%</td>
    <td>5.668</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PP / PDT / PMDB / PTB</td>
    <td>26,51%</td>
    <td>5.523</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSB / PT / PR / PSL / PRP / PHS / PT do B</td>
    <td>25,43%</td>
    <td>5.299</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PRB / PSDC / PMB / PC do B / PROS</td>
    <td>11,17%</td>
    <td>2.328</td>
  </tr>
  <tr>
    <td>5</td>
    <td>DEM / PTN</td>
    <td>9,69%</td>
    <td>2.018</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">SENADOR GUIOMARD</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PP / SD / PMN</td>
    <td>26,94%</td>
    <td>3.865</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PRB / PT / PC do B / PSB</td>
    <td>23,50%</td>
    <td>3.371</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PDT / PMDB / PEN / PSC / PTC / PR / PSDC / PTB</td>
    <td>18,72%</td>
    <td>2.686</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSDB / PTN / DEM</td>
    <td>15,81%</td>
    <td>2.268</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PSD / PPS / PV / PHS</td>
    <td>15,02%</td>
    <td>2.155</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">TARAUACÁ</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PSB / PSOL</td>
    <td>27,98%</td>
    <td>5.105</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PDT / REDE / PSDB</td>
    <td>18,14%</td>
    <td>3.309</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSD / PP / PHS / PPS</td>
    <td>12,99%</td>
    <td>2.370</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PR / PMDB / PSDC / PEN</td>
    <td>11,01%</td>
    <td>2.008</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PRB / PTN</td>
    <td>8,36%</td>
    <td>1.526</td>
  </tr>
  </tbody>
</table>
<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">XAPURI</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>DEM / PP / PSD</td>
    <td>32,86%</td>
    <td>3.100</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PT / PSB / PC do B</td>
    <td>32,39%</td>
    <td>3.056</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PV / PSDB</td>
    <td>26,90%</td>
    <td>2.538</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PROS / PSOL</td>
    <td>4,75%</td>
    <td>448</td>
  </tr>
  </tbody>
</table>
';

  }
  if( $municipio == '1' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">ACRELÂNDIA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </head>
  <tbody>
  <tr>
    <td>1</td>
    <td>PSB / PSL / PMDB / PRP</td>
    <td>28,80%</td>
    <td>2.107</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PP / PSD</td>
    <td>22,86%</td>
    <td>1.673</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSDC / PROS</td>
    <td>17,25%</td>
    <td>1.262</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PRB / PR / DEM</td>
    <td>9,77%</td>
    <td>715</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PDT / PTN / PC do B / PHS</td>
    <td>9,09%</td>
    <td>665</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '2' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">ASSIS BRASIL</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PDT / PMDB / PSDB / PSC / PPS / PSD / PEN / PR</td>
    <td>46,12%</td>
    <td>2.096</td>
  </tr>
  <tr>
    <td>2</td>
    <td>DEM / PP</td>
    <td>19,16%</td>
    <td>871</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PT / PSL / PHS / PSB / PV</td>
    <td>16,02%</td>
    <td>728</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '3' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">BRASILÉIA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PMDB / PSDB</td>
    <td>38,73%</td>
    <td>5.138</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PT / PC do B / PSDC</td>
    <td>23,98%</td>
    <td>3.182</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSB / PROS / PDT</td>
    <td>21,47%</td>
    <td>2.849</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PP / PR / PTC / PTB / PSC / DEM / PRB / REDE / SD / PSD / PEN / PRP</td>
    <td>15,81%</td>
    <td>2.098</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '4' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">BUJARI</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PDT / PRB / PRP / PSC / PMB / PSOL</td>
    <td>29,20%</td>
    <td>1.858</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PMDB / DEM</td>
    <td>23,70%</td>
    <td>1.508</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PC do B / PRB / PR / PHS / PEN / PTC / PSC</td>
    <td>23,51%</td>
    <td>1.496</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSD / PSDC / PSDB</td>
    <td>10,47%</td>
    <td>666</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PSB / PROS</td>
    <td>2,22%</td>
    <td>141</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '5' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">CAPIXABA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PHS / PR / PSDB / PSD / PRB</td>
    <td>26,20%</td>
    <td>1.643</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PMDB / PTB / PSDB / PP</td>
    <td>22,34%</td>
    <td>1.401</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PT / PC do B / PDT / PRP</td>
    <td>20,83%</td>
    <td>1.306</td>
  </tr>
  <tr>
    <td>4</td>
    <td>DEM / PSDC</td>
    <td>19,36%</td>
    <td>1.214</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PHS / PSB</td>
    <td>11,26%</td>
    <td>706</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '6' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">CRUZEIRO DO SUL</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PMDB / PPS / PTB</td>
    <td>28,40%</td>
    <td>11.311</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PDT / PRP / PMN</td>
    <td>21,49%</td>
    <td>8.559</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PP / PR / PSC / PEN / SD / PSD</td>
    <td>14,07%</td>
    <td>5.603</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PHS / PC do B / PROS / PTN / PSL</td>
    <td>13,91%</td>
    <td>5.542</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PSB / PT / PMB / PV</td>
    <td>9,65%</td>
    <td>3.843</td>
  </tr>
  <tr>
    <td>6</td>
    <td>PSDC / PRB / PTC / DEM</td>
    <td>7,11%</td>
    <td>2.832</td>
  </tr>
  <tr>
    <td>7</td>
    <td>PSDB / REDE</td>
    <td>5,38%</td>
    <td>2.144</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '7' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">EPITACIOLÂNDIA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PTN / PROS</td>
    <td>29,81%</td>
    <td>2.670</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PSB / PTC</td>
    <td>22,34%</td>
    <td>2.001</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PP / PT do B / PRP / PDT / PSDC / PPS</td>
    <td>20,81%</td>
    <td>1.864</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSC / PSDB / PSD</td>
    <td>15,90%</td>
    <td>1.424</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PC do B / PRB / PSL / PHS / PV</td>
    <td>10,19%</td>
    <td>913</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '8' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">FEIJÓ</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PP / PSDB</td>
    <td>33,12%</td>
    <td>4.700</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PT / PC do B / PSL</td>
    <td>32,65%</td>
    <td>4.634</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PR / PSD / PRP</td>
    <td>19,67%</td>
    <td>2.791</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSB / PSDC / PDT / DEM</td>
    <td>14,56%</td>
    <td>2.066</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '9' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">JORDÃO</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PC do B</td>
    <td>43,97%</td>
    <td>1.633</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PSDB / PP</td>
    <td>25,44%</td>
    <td>945</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PDT</td>
    <td>18,69%</td>
    <td>694</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PMDB / PR</td>
    <td>11,90%</td>
    <td>442</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '10' ){
   $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">MÂNCIO LIMA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PRB / PT / PC do B</td>
    <td>30,49%</td>
    <td>2.948</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PDT / PROS / PSDC</td>
    <td>21,94%</td>
    <td>2.121</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PP / PSDB / PSD / PPS</td>
    <td>14,68%</td>
    <td>1.419</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PTN / PSB / PV</td>
    <td>14,54%</td>
    <td>1.406</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '11' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">MANOEL URBANO</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PRB / PT / PSB / PV</td>
    <td>39,06%</td>
    <td>1.968</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PMDB / PP / PSDB</td>
    <td>35,60%</td>
    <td>1.794</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSD / PC do B / PR / PSOL / PPS</td>
    <td>23,58%</td>
    <td>1.188</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '12' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">MARECHAL THAUMATURGO</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PDT / PSL / PSDC</td>
    <td>29,38%</td>
    <td>2.148</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PTN / PSB / PC do B</td>
    <td>23,89%</td>
    <td>1.747</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PV</td>
    <td>16,43%</td>
    <td>1.201</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PP / PPS / PSD</td>
    <td>16,14%</td>
    <td>1.180</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PSC / PR / PSDB</td>
    <td>14,17%</td>
    <td>1.036</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '13' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">PLÁCIDO DE CASTRO</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PC do B / PT / PSOL</td>
    <td>27,84%</td>
    <td>2.923</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PR / PSDC / PDT / PSC</td>
    <td>27,20%</td>
    <td>2.856</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PTN / PSDB / SD</td>
    <td>19,34%</td>
    <td>2.031</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSD / PPS / DEM / PSL</td>
    <td>15,07%</td>
    <td>1.582</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PP / PTC / PSD / PV</td>
    <td>10,03%</td>
    <td>1.053</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '14' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">PORTO ACRE</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PC do B / PT / PSOL</td>
    <td>27,84%</td>
    <td>2.923</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PR / PSDC / PDT / PSC</td>
    <td>27,20%</td>
    <td>2.856</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PTN / PSDB / SD</td>
    <td>19,34%</td>
    <td>2.031</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSD / PPS / DEM / PSL</td>
    <td>15,07%</td>
    <td>1.582</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PP / PTC / PSD / PV</td>
    <td>10,03%</td>
    <td>1.053</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '15' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">PORTO WALTER</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PMDB / PP / PDT</td>
    <td>45,92%</td>
    <td>2.168</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PSDB / PSD / PR / PSDC</td>
    <td>35,71%</td>
    <td>1.686</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PT / PSB / PC do B / PROS</td>
    <td>18,36%</td>
    <td>867</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '16' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">RIO BRANCO</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PSB</td>
    <td>21,92%</td>
    <td>41.961</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PMDB / DEM / PSD</td>
    <td>12,11%</td>
    <td>23.175</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PDT / PRB</td>
    <td>11,65%</td>
    <td>22.305</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PHS / PTN</td>
    <td>10,46%</td>
    <td>20.028</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PSL / PMB</td>
    <td>8,87%</td>
    <td>16.984</td>
  </tr>
  <tr>
    <td>6</td>
    <td>PR / PSC / SD / PTC / PEN / PSDB</td>
    <td>8,15%</td>
    <td>15.591</td>
  </tr>
  <tr>
    <td>7</td>
    <td>PC do B / PSOL / PV</td>
    <td>7,01%</td>
    <td>13.414</td>
  </tr>
  <tr>
    <td>8</td>
    <td>PP / PPS / PTB / PMN</td>
    <td>5,77%</td>
    <td>11.047</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '17' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">RODRIGUES ALVES</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PROS</td>
    <td>38,36%</td>
    <td>3.319</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PMDB / PSC</td>
    <td>26,56%</td>
    <td>2.298</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PDT / PSD / PRP / PP</td>
    <td>21,65%</td>
    <td>1.873</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PHS / PRB / PSB / PC do B</td>
    <td>10,77%</td>
    <td>932</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '18' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">SANTA ROSA DO PURUS</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PTN / PC do B / PPS / PRB / PRP</td>
    <td>31,79%</td>
    <td>781</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PT / PROS / PDT / PSB / PT do B</td>
    <td>18,19%</td>
    <td>447</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSD / PSDB</td>
    <td>14,04%</td>
    <td>345</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PV / PTC / PSC</td>
    <td>9,04%</td>
    <td>222</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PP / PMDB / DEM</td>
    <td>2,44%</td>
    <td>60</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '19' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">SENA MADUREIRA</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PSDB / PV / PSD / PPS / PSC / PTC / PEN</td>
    <td>27,20%</td>
    <td>5.668</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PP / PDT / PMDB / PTB</td>
    <td>26,51%</td>
    <td>5.523</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSB / PT / PR / PSL / PRP / PHS / PT do B</td>
    <td>25,43%</td>
    <td>5.299</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PRB / PSDC / PMB / PC do B / PROS</td>
    <td>11,17%</td>
    <td>2.328</td>
  </tr>
  <tr>
    <td>5</td>
    <td>DEM / PTN</td>
    <td>9,69%</td>
    <td>2.018</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '20' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">SENADOR GUIOMARD</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PP / SD / PMN</td>
    <td>26,94%</td>
    <td>3.865</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PRB / PT / PC do B / PSB</td>
    <td>23,50%</td>
    <td>3.371</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PDT / PMDB / PEN / PSC / PTC / PR / PSDC / PTB</td>
    <td>18,72%</td>
    <td>2.686</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PSDB / PTN / DEM</td>
    <td>15,81%</td>
    <td>2.268</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PSD / PPS / PV / PHS</td>
    <td>15,02%</td>
    <td>2.155</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '21' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">TARAUACÁ</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>PT / PSB / PSOL</td>
    <td>27,98%</td>
    <td>5.105</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PDT / REDE / PSDB</td>
    <td>18,14%</td>
    <td>3.309</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PSD / PP / PHS / PPS</td>
    <td>12,99%</td>
    <td>2.370</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PR / PMDB / PSDC / PEN</td>
    <td>11,01%</td>
    <td>2.008</td>
  </tr>
  <tr>
    <td>5</td>
    <td>PRB / PTN</td>
    <td>8,36%</td>
    <td>1.526</td>
  </tr>
  </tbody>
</table>';
  }
  if( $municipio == '22' ){
    $conteudo =  '<h3 class="block-heading fonte-ubuntu fonte-weight-300 fonte-uppercase margin-bottom-0-1em margin-top-0">XAPURI</h3>
<table id="tabela-lista-dados" class="table table-striped">
  <thead>
  <tr>
    <th width="3%">#</th>
    <th width="57%">COLIGAÇÃO</th>
    <th width="15%">%</th>
    <th width="25%">VOTOS</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>1</td>
    <td>DEM / PP / PSD</td>
    <td>32,86%</td>
    <td>3.100</td>
  </tr>
  <tr>
    <td>2</td>
    <td>PT / PSB / PC do B</td>
    <td>32,39%</td>
    <td>3.056</td>
  </tr>
  <tr>
    <td>3</td>
    <td>PMDB / PV / PSDB</td>
    <td>26,90%</td>
    <td>2.538</td>
  </tr>
  <tr>
    <td>4</td>
    <td>PROS / PSOL</td>
    <td>4,75%</td>
    <td>448</td>
  </tr>
  </tbody>
</table>';
  }

  $response = array(
    'results' => $conteudo
  );
  echo json_encode($response);

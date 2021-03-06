$(document).on('turbolinks:load', function(){

  // 新規学校登録の表示・非表示処理
  $('.new_school').hide();
  $('#new_school_check_box').change(function () {
    var prop = $(this).prop('checked');
    if (prop) {
      $('.new_school').show();
      $('#school_select').attr('disabled','disabled'); // 選択不可にする
      $('#school_select').addClass('disabled');
    } else {
      $('.new_school').hide();
      $('#school_select').removeAttr('disabled');
      $('#school_select').removeClass('disabled');
    }
  });

  // web公開日の表示・グレーアウト処理
  // 公開日に値があるかどうか判定
  var start_date = $('#public_start_date_hidden').val();
  var end_date = $('#public_end_date_hidden').val();
  if (!(start_date == "")){
    $('#web_public_presence').prop('checked','checked');
    $('#web_public_none').prop('checked', false);
    $('.public-wrap').removeClass('disabled');
    $('.public-wrap__date').removeAttr('disabled');
    $('#public-period__checkbox').removeAttr('disabled');
    $('#public-wrap__start-date').val(start_date);
    $('#public-wrap__end-date').val(end_date);
  } else {
    // 値がなければ入力フォームをグレーアウト
    $('#web_public_none').prop('checked','checked');
    $('.public-wrap').addClass('disabled');
    $('.public-wrap__date').attr('disabled','disabled');
    $('#public-period__checkbox').attr('disabled','disabled');
  }
  // チェックをした後の動き
  $('input[name="event[web_public]"]:radio').change(function () {
    var radioval = $(this).val();
    if (radioval == 0) {                              // web公開有がチェックされた時
      $('.public-wrap').removeClass('disabled');
      $('.public-wrap__date').removeAttr('disabled');
      $('#public-period__checkbox').removeAttr('disabled');
    } else {
      $('.public-wrap').addClass('disabled');
      $('.public-wrap__date').attr('disabled','disabled');
      $('#public-period__checkbox').attr('disabled','disabled');
    }
  });

  // カレンダー形式の日付入力設定
  $('.public-wrap__date').flatpickr({
    'locale': 'ja',
    dateFormat: 'Y/m/d',
    minDate: 'today'
  });

  // チェックすると1ヶ月後の日付を表示する処理
  $('#public-period__checkbox').change(function () {
    // 1ヶ月後の日付を算出する関数
    Date.prototype.addMonth = function( m ) {
      var d = new Date( this );
      var dates = d.getDate();
      var years = Math.floor( m / 12 );
      var months = m - ( years * 12 );
      if( years ) d.setFullYear( d.getFullYear() + years );
      if( months ) d.setMonth( d.getMonth() + months );
      if( dates == 1 ) {
          d.setDate( 0 );
      } else {
          d.setDate( d.getDate() - 1 );
      }
      return d;
    }

    startDate = $('#public-wrap__start-date').val(); // 公開開始日を取得
    var d = new Date( startDate );
    var endDateBefore = d.addMonth( 1 ); // 関数で計算

    // 日付のフォーマットを変換する関数
    function sampleDate(date, format) {
      format = format.replace(/YYYY/, date.getFullYear());
      format = format.replace(/MM/, ('0' + (date.getMonth() + 1)).slice(-2));
      format = format.replace(/DD/, ('0' + date.getDate()).slice(-2));
      return format;
    }
    var endDate = sampleDate(new Date(endDateBefore), 'YYYY/MM/DD') // 計算結果の日付をフォーマット変換

    var prop = $(this).prop('checked');
    if (prop) {
      $('#public-wrap__end-date').val(endDate);
    }
  });

  // 選択された画像を取得し表示する処理
  $fileField = $('#drop_area')
  $($fileField).on('change', $fileField, function(e) {
    file = e.target.files[0]
    reader = new FileReader(),
    $preview = $("#img_field");

    reader.onload = (function(file) {
      return function(e) {
        $preview.empty();
        $preview.append($('<img>').attr({
          src: e.target.result,
          width: "100%",
          class: "preview",
          title: file.name
        }));
      };
    })(file);
    reader.readAsDataURL(file);
  });

  $(document).ready(function(){
    $("#index-table-tablesorter").tablesorter();
  });
});

// Dropzone用の記述
// $(document).ready(function () {
//   Dropzone.autoDiscover = false;
//   $("#item-dropzone").dropzone({
//       // url: "hn_SimpeFileUploader.ashx",
//       url: "/images",
//       addRemoveLinks: true,
//       success: function (file, response) {
//           var imgName = response;
//           file.previewElement.classList.add("dz-success");
//           console.log("Successfully uploaded :" + imgName);
//       },
//       error: function (file, response) {
//           // file.previewElement.classList.add("dz-error");
//       }
//   });
// });

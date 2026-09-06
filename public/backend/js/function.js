function loadItemDetails(action, id){
    var payload = {};
    payload['action'] = action;
    payload['id'] = id;

    $.ajax({
        url: '/admnin/utility',
        method: 'GET',
        data: payload,
        success: function(response) {
            if(response.success){
                $('#' + action).modal('show');
                $('#' + action + 'Content').html(response.data);
                if(action != 'viewCode'){
                    initMenu(response.reff);
                }
            }
            else{
                errorToast(response.message);
            }
        },
        error: function(xhr, status, error) {
            let message = 'Error occurred while fetching..';
            if (xhr.responseJSON && xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            } else if (xhr.responseText) {
                message = xhr.responseText;
            }
            errorToast(message);
        },
    });
}

// FORM SUBMIT
const formIds = [
  'updateCustomerProfile', 'updateCustomerPassword', 'addCustomPrice', 'addBalanceToCustomer',
  'removeBalanceToCustomer', 'updateCustomerOverDue', 'updateCustomerApi', 'updateCustomerAccount', 'newCustomerForm',
  'importScriptForm', 'newCustomerForm', 'updateTimezoneForm', 'apiInfoUpdateForm', 'apiPricingUpdateForm', 'apiManageUpdateForm',
  'apiDeleteUpdateForm', 'addNewApiForm', 'adminBotConnenctForm', 'adminBotDisconnenctForm', 'adminBotOptionsConnectForm_40',
  'adminBotOptionsConnectForm_41', 'adminBotOptionsConnectForm_42', 'adminBotOptionsConnectForm_43', 'adminBotOptionsConnectForm_44', 'adminBotOptionsConnectForm_45',
  'adminBotOptionsConnectForm_46', 'adminBotOptionsConnectForm_47', 'adminBotOptionsConnectForm_48', 'adminBotOptionsConnectForm_49', 'adminBotOptionsConnectForm_50', 
  'adminBotOptionsDisconnectForm_40', 'adminBotOptionsDisconnectForm_41', 'adminBotOptionsDisconnectForm_42', 'adminBotOptionsDisconnectForm_43', 'adminBotOptionsDisconnectForm_44',
  'adminBotOptionsDisconnectForm_45', 'adminBotOptionsDisconnectForm_46', 'adminBotOptionsDisconnectForm_47', 'adminBotOptionsDisconnectForm_48', 'adminBotOptionsDisconnectForm_49',
  'adminBotOptionsDisconnectForm_50', 'clientBotConnenctForm', 'clientBotDisconnenctForm', 'updateCodeForm', 'updateInventoryForm', 'addNewInventoryForm', 'deleteInventoryForm',
  'updateSmtp1', 'updateSmtp2', 'updateSmtp3', 'updateSmtp4', 'updateSmtp5', 'updateSmtp6', 'updateSmtp7', 'updateEmailConfigs'
];
const confirmIds = [
    'apiDeleteUpdateForm', 'adminBotDisconnenctForm', 'adminBotOptionsDisconnectForm_40', 'adminBotOptionsDisconnectForm_41', 'adminBotOptionsDisconnectForm_42', 'adminBotOptionsDisconnectForm_43', 'adminBotOptionsDisconnectForm_44',
  'adminBotOptionsDisconnectForm_45', 'adminBotOptionsDisconnectForm_46', 'adminBotOptionsDisconnectForm_47', 'adminBotOptionsDisconnectForm_48', 'adminBotOptionsDisconnectForm_49',
  'adminBotOptionsDisconnectForm_50', 'clientBotDisconnenctForm', 'deleteInventoryForm'
];

const selector = formIds.map(id => '#' + id).join(', ');
const confirmSelector = confirmIds.map(id => '#' + id).join(', ');

$(document).off('submit', selector).on('submit', selector, function(e){
  e.preventDefault();

  if ($(this).is(confirmSelector)) {
    const isConfirmed = confirm('Are you sure?');
    if (!isConfirmed) {
        return;
    }
  }
  
  var $form = $(this);
  var $submitBtn = $(e.originalEvent.submitter);
  var $submitBtnText = $.trim($submitBtn.text());
  var $submitBtnLoader = '<span class="spinner-border spinner-border-sm spinner-xs me-1" role="status" aria-hidden="true"></span>';
  var action = this.id;

  var hasFile = $form.find('input[type="file"]').filter(function() { return this.files.length > 0; }).length > 0;

  var ajaxOptions = {
    url: '/admnin/utility',
    method: 'POST',
    beforeSend: function() {
      $submitBtn.html($submitBtnLoader + ' Loading...').prop('disabled', true);
      $('body').addClass('request-in-progress');
    },
    complete: function() {
      setTimeout(function() {
        $submitBtn.html($submitBtnText).prop('disabled', false);
        $('body').removeClass('request-in-progress');
      }, 1000);
    },
    success: function(response) {
      if (response.success) {
        if (response.function) {
          window[response.function]();
        }
        setTimeout(function() {
          if (action === 'updateCustomerPassword') {
            $form[0].reset();
          } 
          else if (action === 'addCustomPrice') {
            setNewCustomPriceList(response.data);
          } 
          else if (action === 'addBalanceToCustomer') {
            fundsUpdateSuccessAction(response.message);
          } 
          else if (action === 'removeBalanceToCustomer') {
            fundsUpdateSuccessAction(response.message);
          } 
          else if (action === 'importScriptForm') {
            $form[0].reset();
          } 
          else if (action === 'newCustomerForm') {
            $form[0].reset();
            closeAddNewCustomerModal();
          } 
          else if (action === 'apiDeleteUpdateForm') {
            closeApiModal();
          } 
          else if (action === 'addNewApiForm') {
            $form[0].reset();
            closeAddApiModal();
          } 
          else if (action === 'adminBotConnenctForm') {
            adminBotUpdateToggle(response.data);
          } 
          else if (action === 'adminBotDisconnenctForm') {
            adminBotUpdateToggle(response.data);
          } 
          else if (action === 'clientBotConnenctForm') {
            clientBotUpdateToggle(response.data);
          } 
          else if (action === 'clientBotDisconnenctForm') {
            clientBotUpdateToggle(response.data);
          } 
          else if (action === 'adminBotOptionsConnectForm_40') {
            botOptionUpdateToggle(response.data, 'optionid_40');
          } 
          else if (action === 'adminBotOptionsConnectForm_41') {
            botOptionUpdateToggle(response.data, 'optionid_41');
          } 
          else if (action === 'adminBotOptionsConnectForm_42') {
            botOptionUpdateToggle(response.data, 'optionid_42');
          } 
          else if (action === 'adminBotOptionsConnectForm_43') {
            botOptionUpdateToggle(response.data, 'optionid_43');
          } 
          else if (action === 'adminBotOptionsConnectForm_44') {
            botOptionUpdateToggle(response.data, 'optionid_44');
          } 
          else if (action === 'adminBotOptionsConnectForm_45') {
            botOptionUpdateToggle(response.data, 'optionid_45');
          } 
          else if (action === 'adminBotOptionsConnectForm_46') {
            botOptionUpdateToggle(response.data, 'optionid_46');
          } 
          else if (action === 'adminBotOptionsConnectForm_47') {
            botOptionUpdateToggle(response.data, 'optionid_47');
          } 
          else if (action === 'adminBotOptionsConnectForm_48') {
            botOptionUpdateToggle(response.data, 'optionid_48');
          } 
          else if (action === 'adminBotOptionsConnectForm_49') {
            botOptionUpdateToggle(response.data, 'optionid_49');
          } 
          else if (action === 'adminBotOptionsConnectForm_50') {
            botOptionUpdateToggle(response.data, 'optionid_50');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_40') {
            botOptionUpdateToggle(response.data, 'optionid_40');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_41') {
            botOptionUpdateToggle(response.data, 'optionid_41');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_42') {
            botOptionUpdateToggle(response.data, 'optionid_42');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_43') {
            botOptionUpdateToggle(response.data, 'optionid_43');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_44') {
            botOptionUpdateToggle(response.data, 'optionid_44');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_45') {
            botOptionUpdateToggle(response.data, 'optionid_45');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_46') {
            botOptionUpdateToggle(response.data, 'optionid_46');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_47') {
            botOptionUpdateToggle(response.data, 'optionid_47');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_48') {
            botOptionUpdateToggle(response.data, 'optionid_48');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_49') {
            botOptionUpdateToggle(response.data, 'optionid_49');
          } 
          else if (action === 'adminBotOptionsDisconnectForm_50') {
            botOptionUpdateToggle(response.data, 'optionid_50');
          }
          else if (action === 'updateCodeForm') {
            hideCodeUpdateModal();
          }
          else if (action === 'addNewInventoryForm') {
            hideAddNewModal();
          }
          else if (action === 'deleteInventoryForm') {
            hideViewModal();
          }
          

          successToast(response.message);
        }, 1000);
      } else {
        errorToast(response.message);
      }
    },
    error: function(xhr) {
      let message = 'Error occurred while fetching..';
      if (xhr.responseJSON && xhr.responseJSON.message) {
        message = xhr.responseJSON.message;
      } else if (xhr.responseText) {
        message = xhr.responseText;
      }
      errorToast(message);
    }
  };

  if (hasFile) {
    var formData = new FormData(this);
    formData.append('action', action);
    $form.find('input[type="checkbox"]').each(function() {
      formData.set(this.name, this.checked ? 1 : 0);
    });
    ajaxOptions.data = formData;
    ajaxOptions.contentType = false;
    ajaxOptions.processData = false;
  } else {
    var payload = { action: action };
    $.each($form.serializeArray(), function(_, field) {
      payload[field.name] = field.value;
    });
    $form.find('input[type="checkbox"]').each(function() {
      payload[this.name] = this.checked ? 1 : 0;
    });
    ajaxOptions.data = payload;
  }

  $.ajax(ajaxOptions);
});

function initGtAjax(method, data, btn = null, isLoader = false){
    if(!method){
        errorToast('Method is required');
        return;
    }
    if(!data){
        errorToast('Data is required');
        return;
    }

    let submitBtnText = null;
    let submitBtnLoader = null;

    if(btn && isLoader){
        submitBtnText = $.trim(btn.text());
        submitBtnLoader = '<span class="spinner-border spinner-border-sm spinner-xs me-1" role="status" aria-hidden="true"></span>';
    }

    $.ajax({
        url: '/admnin/utility',
        method: method,
        data: data,
        beforeSend: function() {
            if(btn && isLoader && submitBtnLoader){
                btn.html(submitBtnLoader + ' Loading...');
            }
            if(btn){
                btn.prop('disabled', true)
            }
        },
        complete: function() {
            setTimeout(function() {
                if(btn){
                    if(data.action != 'addServicesFromApi'){
                        btn.prop('disabled', false)
                    }
                }
                if(btn && isLoader && submitBtnText){
                    btn.html(submitBtnText);
                }
            }, 1000);
            
        },
        success: function(response) {
            if (response.success) {
                if(response.function){
                    window[response.function]();
                }

                if(data.action === 'syncApi'){
                    apiSyncCompleted(response.reff)
                }
                else if(data.action === 'addServicesFromApi'){
                    refreshRemoteServiceListTable(response.reff);
                }
                else if(data.action === 'fetchInvRemoteServiceList'){
                    updateRemoteServiceListDom(response.data);
                    return;
                }

                setTimeout(function() {
                    if(data.action === 'deleteCustomPrice'){
                        customPriceDeleteSuccess(btn);
                    }
                    else if(data.action === 'generateCustomerApi'){
                        apiGenerateSuccess(response.data)
                    }
                    else if(data.action === 'resetCustomerApiIp'){
                        apiIpResetSuccessful();
                    }
                    else if(data.action === 'deleteCustomerAccount'){
                        customerDeleteSuccess();
                    }
                    else if(data.action === 'addCodeForm'){
                        codeAddedSuccess();
                    }
                    successToast(response.message);
                }, 1000);

            } else {

                if(data.action === 'addServicesFromApi'){
                    triggerPricing();
                }
                errorToast(response.message);
            }
        },
        error: function(xhr, status, error) {
            let message = 'Error occurred while fetching..';
            if (xhr.responseJSON && xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            } else if (xhr.responseText) {
                message = xhr.responseText;
            }
            errorToast(message);
        }
    });
}

function imgSelect2(selector, isModal, imgType) {
    var options = {
        theme: 'bootstrap-5',
        width: '100%',
        minimumResultsForSearch: 0,
        templateResult: function (state) {
            return formatCountryOption(state, imgType);
        },
        templateSelection: function (state) {
            return formatCountryOption(state, imgType);
        },
    };

    if (isModal) {
        var $modal = $(selector).closest('.modal');
        if ($modal.length) {
            options.dropdownParent = $modal;
        }
    }

    $(selector).select2(options);

    var currentdata = $(selector).data('currentdata');
    if (currentdata) {
        $(selector).val(currentdata).trigger('change');
    }

    $(selector).on('select2:open', function () {
        var dropdown = isModal
            ? $modal.find('.select2-dropdown')
            : $('.select2-dropdown');

        $('.select2-container--open .select2-search__field')
            .attr('autocomplete', 'off')
            .on('focus blur', function () {
                $(this).css({ 'box-shadow': 'none', 'border-color': '#dcdde1' });
            });

        dropdown.css({
            'border-color': '#dcdde1',
            'box-shadow': 'none'
        });
    });

    $(selector).next('.select2-container').find('.select2-selection').on('focus blur', function () {
        $(this).css({ 'box-shadow': 'none', 'border-color': '#dcdde1' });
    });
}
function formatCountryOption(state, imgType) {
  if (!state.id) {
      return state.text;
  }
  var imgurl = $(state.element).data('imgurl');
  if (!imgurl) {
      return state.text;
  }

  if(imgType === 'flag'){
    return $(
        '<span style="display:flex;align-items:center;">' +
            '<img src="' + imgurl + '" style="width:35px;height:22px;border-radius:5px;margin-right:10px;flex-shrink:0;" alt="" />' +
            '<span>' + state.text + '</span>' +
        '</span>'
    );
  }
  else if(imgType === 'square'){
    return $(
        '<span style="display:flex;align-items:center;">' +
            '<img src="' + imgurl + '" style="width:30px;height:30px;border-radius:2px;margin-right:10px;flex-shrink:0;" alt="" />' +
            '<span>' + state.text + '</span>' +
        '</span>'
    );
  }

}

function intSelect2(selector, isModal){
    var options = {
        theme: 'bootstrap-5',
        width: '100%',
        minimumResultsForSearch: 0,
    };

    if (isModal) {
        var $modal = $(selector).closest('.modal');
        if ($modal.length) {
            options.dropdownParent = $modal;
        }
    }

    $(selector).select2(options);

    var currentdata = $(selector).data('currentdata');
    if (currentdata) {
        $(selector).val(currentdata).trigger('change');
    }

    $(selector).on('select2:open', function () {
        var dropdown = isModal
            ? $modal.find('.select2-dropdown')
            : $('.select2-dropdown');

        $('.select2-container--open .select2-search__field')
            .attr('autocomplete', 'off')
            .on('focus blur', function () {
                $(this).css({ 'box-shadow': 'none', 'border-color': '#dcdde1' });
            });

        dropdown.css({
            'border-color': '#dcdde1',
            'box-shadow': 'none'
        });
    });

    $(selector).next('.select2-container').find('.select2-selection')
    .on('focus blur', function () {
        $(this).css({ 'box-shadow': 'none', 'border-color': '#dcdde1' });
    });
}

function initSearchBox(selector, table){
    $(selector).on('input', function() {
        var searchValue = this.value;
        if (searchValue.length === 0) {
            table.search('').draw();
        } else {
            table.search(searchValue).draw();
        }
    });
}
function loadCheckbox(root){
    const currentSelector = root + ' .card-header:nth-child(1)';
    const selectedSelector = root + ' .card-header:nth-child(2)';
    $(root + ' #select-all').prop('checked', false);
    $(root + ' table > thead').css('background-color', '');
    $(currentSelector).show();
    $(selectedSelector).hide();
}
function initBasicCheckBox(root){
    if(!root){
        errorToast('Root ID is required');
        return;
    }
    $(root +' #select-all').off('click').on('click', function() {
        toggleCheckboxes(root, $(this).prop('checked'));
        updateRowBackground(root);
    });
    $(root + ' tbody').on('change', '.row-checkbox', function() {
        updateSelectAllCheckbox(root);
        updateRowBackground(root);
    });
}
function initCheckbox(root){
    if(!root){
        errorToast('Root ID is required');
        return;
    }
    const currentSelector = root + ' .card-header:nth-child(1)';
    const selectedSelector = root + ' .card-header:nth-child(2)';
    if(!$(currentSelector).length || !$(selectedSelector).length){
        errorToast('Two card-header is required');
        return;
    }
    $(root +' #select-all').off('click').on('click', function() {
        toggleCheckboxes(root, $(this).prop('checked'));
        updateTitleBackground(root, currentSelector, selectedSelector);
        updateRowBackground(root);
    });
    $(root + ' tbody').on('change', '.row-checkbox', function() {
        updateSelectAllCheckbox(root);
        updateTitleBackground(root, currentSelector, selectedSelector);
        updateRowBackground(root);
    });
}
function toggleCheckboxes(root, checkedState) {
    $(root + ' .row-checkbox').prop('checked', checkedState);
}
function updateSelectAllCheckbox(root) {
    var selectedCount = $(root + ' .row-checkbox:checked').length;
    var totalRows = $(root + ' .row-checkbox').length;
    $(root + ' #select-all').prop('checked', selectedCount === totalRows);
}
function updateTitleBackground(root, currentSelector, selectedSelector) {
    var selectedCount = $(root + ' .row-checkbox:checked').length;
    if (selectedCount > 0) {
        $(root + ' .table > thead').css('background-color', 'rgb(227 227 227)');
        $(currentSelector).hide();
        $(selectedSelector).show();
        $(root + ' #selectedcount').html(`${selectedCount} selected`);
    } else {
        $(root + ' .table > thead').css('background-color', '');
        $(currentSelector).show();
        $(selectedSelector).hide();
    }
}
function updateRowBackground(root) {
    $(root + ' .row-checkbox:checked').each(function() {
        $(this).closest('tr').css('background-color', 'rgb(227 227 227)');
    });
    $(root +' .row-checkbox:not(:checked)').each(function() {
        $(this).closest('tr').css('background-color', '');
    });
}
function formatedId(data){
    return `<span class="table-id">#${data}</span>`
}
function formatedSubstringe(data, maxLength){
    if (data && data.length > maxLength) {
        return `<span data-toggle="tooltip" title="${data}">${data.substring(0, maxLength)}...</span>`;
    } else {
        return `<span data-toggle="tooltip" title="${data}">${data}</span>`;
    }
};
function easyDatatime(data) {
    if (data) {
        const date = new Date(data);
        const timeZone = window.CONFIG.timezone;
        const timeformat = window.CONFIG.timeformat;

        let formatHour12 = false;
        if(timeformat === '12 Hour'){
            formatHour12 = true;
        }

        const formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: timeZone,
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: formatHour12
        });

        const parts = formatter.formatToParts(date).reduce((acc, part) => {
            acc[part.type] = part.value;
            return acc;
        }, {});

        if(formatHour12){
            return `${parts.day}-${parts.month}-${parts.year} ${parts.hour}:${parts.minute} ${parts.dayPeriod.toUpperCase()}`;
        }
        else{
            return `${parts.day}-${parts.month}-${parts.year} ${parts.hour}:${parts.minute}`;
        }
    }
    return '-';
}
function formatedOrderField(data){
    if (data !== null && data !== undefined) {
        const shortText = data.length > 18 ? data.substring(0, 18) + '...' : data;
        return `<span data-toggle="tooltip" title="${data}">${shortText}</span>`;
    } else {
        return '-';
    }
}
function formatedOrderAmount(data, row){
    const currency = row.currency || '';
    return data !== null && data !== undefined
        ? `${data} ${currency}` : '-';
}
function formatedWaitingStatus(data, row){
    if(data === 'Sending Error'){
        return `<span class="badge bg-danger fs-6" data-toggle="tooltip" title="${row.message}"><i class="fas fa-ban"></i> Sending Error </span>`;
    } else if (data === 'Sending...') {
        return `<span class="badge bg-warning fs-6"><i class="fas fa-hourglass-half"></i> Sending... </span>`;
    } else{
        return `<span class="badge bg-primary fs-6"><i class="fas fa-hourglass-half"></i> ${data}</span>`;
    }
}
function formatedInprocessStatus(data, row){
    if(data === 'Fetching Error'){
        return `<span class="badge bg-danger fs-6" data-toggle="tooltip" title="${row.message}"><i class="fas fa-ban"></i> Fetching Error </span>`;
    } else if (data === 'Fetching...') {
        return `<span class="badge bg-warning fs-6"><i class="fas fa-hourglass-half"></i> Fetching... </span>`;
    } else{
        return `<span class="badge bg-warning fs-6"><i class="fas fa-clock"></i> ${data}</span>`;
    }
}
function formatedSuccessStatus(data){
    return `<span class="badge bg-success fs-6"><i class="fas fa-check-circle"></i> ${data}</span>`;
}
function formatedRejectedStatus(data){
    return `<span class="badge bg-danger fs-6"><i class="fas fa-ban"></i> ${data}</span>`;
}
function updateAdminTheme(click){
    var themeData = click.attr('data-value');
    if (themeData == 'true') {
        $('html').attr('data-pc-theme', 'light');
        click.addClass('active');
        var themeMode = 'light';
        updateAdminThemeAjax(themeMode);
    } else {
        $('html').attr('data-pc-theme', 'dark');
        click.addClass('active');
        var themeMode = 'dark';
        updateAdminThemeAjax(themeMode);
    }
    $('.theme-mode').not(click).removeClass('active');
}
function updateAdminThemeAjax(themeMode) {
    $.ajax({
        url: '/admnin/utility?action=updateAdminTheme&mode=' + themeMode,
        type: 'GET',
    });
}
function filterPricing(selector){
    $(selector).on('input', function() {
        this.value = this.value.replace(/[^0-9.]/g, '');
        const parts = this.value.split('.');
        if (parts.length > 2) {
            this.value = parts[0] + '.' + parts.slice(1).join('');
        }
        if (this.value.length > 12) {
            this.value = this.value.slice(0, 12);
        }
    });
}
function filterNumber(selector){
    $(selector).on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 12) {
            this.value = this.value.slice(0, 12);
        }
    });
}
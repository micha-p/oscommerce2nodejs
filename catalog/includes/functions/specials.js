/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2012 osCommerce

  Released under the GNU General Public License
*/
////
// Sets the status of a special product
function tep_set_specials_status(specials_id, status)
{
    return tep_db_query('update ' + TABLE_SPECIALS + ' set status = \'' + status + '\', date_status_change = now() where specials_id = \'' + specials_id + '\'');
}
////
// Auto expire products on special
function tep_expire_specials()
{
    specials_query = tep_db_query('select specials_id from ' + TABLE_SPECIALS + ' where status = \'1\' and now() >= expires_date and expires_date > 0');
    if (tep_db_num_rows(specials_query)) {
        tep_db_fetch_array(specials_query).forEach(function(specials){
            tep_set_specials_status(specials['specials_id'], '0');
        })
    }
}

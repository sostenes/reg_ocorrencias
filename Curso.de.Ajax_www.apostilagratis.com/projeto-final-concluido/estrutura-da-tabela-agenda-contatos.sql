-- 
-- Table structure for table `agenda_contatos`
-- 

CREATE TABLE `agenda_contatos` (
  `cont_id` int(11) unsigned NOT NULL auto_increment,
  `cont_nome` varchar(150) NOT NULL default '',
  `cont_obs` text,
  `cont_ddd` char(2) NOT NULL default '',
  `cont_tel` varchar(9) NOT NULL default '',
  `cont_cel` varchar(9) default NULL,
  `cont_email` varchar(64) NOT NULL default '',
  `cont_blog` varchar(255) default NULL,
  `cont_msn` varchar(64) default NULL,
  `cont_gtalk` varchar(64) default NULL,
  `cont_skype` varchar(32) default NULL,
  `cont_data_cad` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`cont_id`),
  KEY `cont_nome` (`cont_nome`)
) TYPE=MyISAM COMMENT='Cadastros da minha agenda de contatos.';
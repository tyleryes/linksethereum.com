		$(document).ready( function () {
			t = $('#myTable').DataTable( {
				 "order": [[ 3, "desc" ]],
				 columns: [
					{ title: "Description","width": "35%" },
					{ title: "URL","width": "20%" },
					{ title: "Transaction Hash" },
					{ title: "Block" },
					{ title: "File Type" }
				],
			} );
			
			if(getCookie("rememberapi")!="") $('#account').val( getCookie("rememberapi"));
		} );
		var web3 = new Web3();
		
		function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
			if (endBlockNumber == null) {
				endBlockNumber = web3.eth.blockNumber;
				console.log("Using endBlockNumber: " + endBlockNumber);
			}
			if (startBlockNumber == null) {
				startBlockNumber = endBlockNumber - 1000;
				console.log("Using startBlockNumber: " + startBlockNumber);
			}
			console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

			for (var i = startBlockNumber; i <= endBlockNumber; i++) {
				var block = web3.eth.getBlock(i, true);
				if (block != null && block.transactions != null) {
				  block.transactions.forEach( function(e) {
					myaccount=myaccount.toUpperCase();
					if(e.from!=null && e.to!=null) if (myaccount == "*" || myaccount == e.from.toUpperCase() || myaccount == e.to.toUpperCase()) {
						settable(e,t);
					}
				  })
				}
			}
		}
		
		function settable(val,t){
			web3.eth.getTransaction(val.hash, (error, txResult) => {
				if(txResult.input!="" && txResult.input!=null){
					result=(abiDecoder.decodeMethod(txResult.input));
					var inputdata=($.parseJSON(result.params[0].value));
					
					if(inputdata.url!=null && inputdata.url!=""  && inputdata.description!="" && inputdata.description!=undefined && inputdata.type=="L"){
						rowdata=[inputdata.description,inputdata.url,val.hash,val.blockNumber,inputdata.filetype];
						t.row.add( rowdata ).draw( false );
					}
					if(document.getElementById("loading").innerHTML!="") document.getElementById("loading").innerHTML="";
				}
			});
			
		}
		
		function getfiles(evt){
			document.getElementById("loading").innerHTML="Loading...";
			evt.preventDefault();
			var account = document.getElementById("account").value;
			setCookie("rememberapi", account);
			var contract = document.getElementById("contract").value;
			var abit = document.getElementById("abit").value;
			var etherscan = document.getElementById("etherscan").value;
			var tob = document.getElementById("tob").value;
			var fromb = document.getElementById("fromb").value;
			
			if(currentValue=="account"){
				account="https://mainnet.infura.io/"+account;
			}else{
				account = document.getElementById("localhost").value;
			}
			if(account!="" && contract!=""){
				web3.setProvider(new web3.providers.HttpProvider(account));
				
				if(fromb=="") fromb = 0;
				if(tob=="last" || tob=="") tob = web3.eth.blockNumber;

				const cABI = abit;
				abiDecoder.addABI($.parseJSON(cABI));
				
				if(transactionsfrommethod=="etherscan"){
					$.getJSON( "https://api.etherscan.io/api?module=account&action=txlist&address="+contract+"&startblock="+fromb+"&endblock="+tob+"&sort=asc&apikey="+etherscan
						, function( data ) {
							  inputdata = [];
							  var ii=0;
							  
							  $.each( data.result, function( key, val ) {
								settable(val,t);
								
							  });
							  
					});
				}else{
					getTransactionsByAccount(contract,fromb,tob);
				}
			}
			
			return false;
		}
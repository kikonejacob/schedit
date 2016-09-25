<!-- View stored in resources/views/list/greeting.php -->

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<style type="text/css">
		    table { page-break-inside:auto }
		    div   { page-break-inside:avoid; } /* This is the key */
		    thead { display:table-header-group }
		    tfoot { display:table-footer-group }
		</style>
	</head>
    <body>
        <h1><?php echo $title; ?></h1>
        <div>
	        <table class="list" border=1>
	        	<thead>
	        		{{--Printing columns--}}
	        		<tr> 
	        		@foreach($columns as $column)

	        			<td>{{$column["caption"]}}</td>

	        		@endforeach

	        		</tr>
	        	</thead>
	        	<tbody>
	        	{{-- print body of the list table--}}
	        	@foreach($data as $item)

	        	   <tr>
	        	   @foreach ($columns as $col)

	  						<td>{{$item[$col["name"]]}}</td>

	        		@endforeach
	        		</tr>

	        		
	  			@endforeach

	        	</tbody>
	        </table>

    </body>
</html>
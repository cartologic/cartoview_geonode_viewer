from django.shortcuts import render, render_to_response, HttpResponse, redirect, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from . import APP_NAME
from viewer import views as viewer_views


def view_map(request, instance_id):
    return viewer_views.view_app(request, instance_id, "%s/view.html" % APP_NAME)


@login_required
def new(request):
    return viewer_views.new(request, app_name=APP_NAME, template="%s/edit.html" % APP_NAME)

@login_required
def edit(request, instance_id):
    return viewer_views.edit(request, instance_id, template="%s/edit.html" % APP_NAME)